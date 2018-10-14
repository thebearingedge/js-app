import createServer from './server/create-server'
import { knex, redis } from './database/connections'

const dev = process.env.NODE_ENV === 'development'

;(async () => {
  const app = await createServer({ dev, knex, redis })
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', process.env.PORT)
  })
})()
