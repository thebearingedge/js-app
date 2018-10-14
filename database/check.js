import Knex from 'knex'
import retry from 'promise-retry'
import { createClient } from 'redis'

function connectToPostgres() {
  const knex = Knex({
    client: 'pg',
    connection: process.env.POSTGRES_URL
  })
  return retry(async retry => {
    try {
      await knex.raw('select 1')
    }
    catch (err) /* istanbul ignore next */ {
      if (err.code !== 'ETIMEDOUT') return retry(err)
      throw err
    }
  }, { retries: 3 })
}

function connectToRedis() {
  return retry(async retry => {
    try {
      await new Promise((resolve, reject) => {
        const redis = createClient({
          url: process.env.REDIS_URL,
          retry_strategy: /* istanbul ignore next */ ({ error }) => {
            reject(error)
            return null
          }
        })
        redis.on('ready', resolve)
      })
    }
    catch (err) /* istanbul ignore next */ {
      if (err.code !== 'ETIMEDOUT') return retry(err)
      throw err
    }
  }, { retries: 3 })
}

(async () => {
  try {
    await Promise.all([
      connectToRedis(),
      connectToPostgres()
    ])
    process.exit(0)
  }
  catch (err) /* istanbul ignore next */ {
    console.error(err)
    process.exit(1)
  }
})()
