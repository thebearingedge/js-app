import Router from 'express-promise-router'
import * as middleware from './middleware'

export default function authRouter() {
  return Router()
    .post('/login', middleware.handleLogin())
}
