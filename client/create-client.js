import next from 'next'
import express from 'express'
import { sessionMiddleware } from '../__common__'

export default async function createClient({ dev, redis }) {
  const pages = next({ dev, dir: __dirname })
  const handle = pages.getRequestHandler()
  await pages.prepare()
  return express()
    .use(sessionMiddleware({ redis }))
    .use((req, res) => handle(req, res))
}
