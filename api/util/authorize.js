import Boom from 'boom'
import jwt from 'jsonwebtoken'

export default function authorizeMiddleware(req, res, next) {
  if (req.session.user) {
    req.user = req.session.user
    return next()
  }
  if (req.xhr) {
    throw Boom.unauthorized('Access token required.')
  }
  const token = req.get('x-access-token')
  if (!token) throw Boom.unauthorized('Access token required.')
  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET)
    return next()
  }
  catch (err) {
    throw Boom.boomify(err, { statusCode: 401 })
  }
}
