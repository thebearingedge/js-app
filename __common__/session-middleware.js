import session from 'express-session'
import createStore from 'connect-redis'

export default function sessionMiddleware({ redis }) {
  const RedisStore = createStore(session)
  return session({
    resave: true,
    name: 'token',
    rolling: true,
    saveUninitialized: false,
    genid: ({ token }) => token,
    secret: process.env.TOKEN_SECRET,
    store: new RedisStore({
      prefix: '',
      client: redis,
      ttl: parseInt(process.env.TOKEN_EXPIRY, 10)
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.TOKEN_EXPIRY, 10)
    }
  })
}
