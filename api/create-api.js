import express from 'express'
import authRouter from './auth-router'
import { authorize, errorHandler } from './util'
import { sessionMiddleware } from '../__common__'

export default function createApi({ knex, redis }) {
  return express()
    .use(sessionMiddleware({ redis }))
    .use('/auth', authRouter({ knex }))
    .use(authorize)
    .use(errorHandler())
}
