function logErrors (err, req, res, next) {
  console.error(err)
  next(err)
}

const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send(
      { error: 'id is not a valid' }),
  JsonWebTokenError: res => res.status(401).json({ error: 'token missing or invalid' }),
  TokenExpiresError: res => res.status(401).json({ error: 'token expired' }),
  defaultError: (res, { mesagge }) => res.status(500).json(mesagge).end()
}

function errorHandler (err, req, res, next) {
  console.error(err.name)
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    // Donde boom almacena toda la informacion del error el output
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
