import cypress from 'cypress'
import createServer from '../server/create-server'

const [ , , mode = 'run' ] = process.argv
const dev = mode === 'open' &&
            process.env.NODE_ENV === 'development'

;(async () => {
  const server = await createServer({ dev })
  server.listen(process.env.PORT, async () => {
    try {
      const results = await cypress[mode]({
        headed: dev,
        env: process.env,
        browser: 'chrome',
        config: {
          baseUrl: process.env.SERVER_URL
        }
      })
      results.totalFailed
        ? process.exit(1)
        : process.exit(0)
    }
    catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
})()
