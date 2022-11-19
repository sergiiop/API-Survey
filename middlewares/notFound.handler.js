import { notFound } from '@hapi/boom'

function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload }
  } = notFound()

  res.status(statusCode).json(payload)
}

export default notFoundHandler
