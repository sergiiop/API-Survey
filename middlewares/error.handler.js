function logErrors (err, req, res, next) {
  console.error(err)
  next(err)
}

function errorHandler (err, req, res, next) {
  const error = {
    message: err.message,
    stack: err.stack
  }
  if (err.name === 'CastError') {
    res.status(400).json(error).end()
  }

  res.status(500).json(error).end()
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
