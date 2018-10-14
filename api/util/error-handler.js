import Boom from 'boom'

/* istanbul ignore next */
function notFound({ method, originalUrl }, res) {
  throw Boom.notFound(`Cannot ${method} ${originalUrl}`)
}

function error(err, req, res, next) {
  /* istanbul ignore else */
  if (Boom.isBoom(err)) {
    const { output: { statusCode, payload } } = err
    return res.status(statusCode).json(payload)
  }
  else {
    console.error(err)
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred.'
    })
  }
}

export default function errorHandler() {
  return [
    notFound,
    error
  ]
}
