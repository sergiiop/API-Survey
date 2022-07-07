require('./lib/mongo')
const express = require('express')
const routerApi = require('./routes')
const { config } = require('./config/config')
// const cors = require('cors')

// const passport = require('passport')

const {
  errorHandler,
  logErrors,
  boomErrorHandler
} = require('./middlewares/error.handler')
const notFoundHandler = require('./middlewares/notFound.handler')

// const { checkApiKey } = require('./middlewares/auth.handler')

const app = express()
const port = config.port

app.use(express.json())

// const whitelist = ['http://localhost:3000/', 'http://myapp.co', 'localhost']

// const options = {
//   origin: (origin, cb) => {
//     if (whitelist.includes(origin) || !origin) {
//       cb(null, true)
//     } else {
//       cb(new Error('No permitido'))
//     }
//   }
// }
// app.use(cors(options))

// require('./utils/auth')

// app.use(passport.initialize())

// app.get('/nueva-ruta', checkApiKey, (req, res) => {
//   res.send('Hola, estoy autorizado')
// })

routerApi(app)

// catch 404
app.use(notFoundHandler)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

const server = app.listen(port, () => {
  console.log(`Puerto Corriendo en ${port}`)
})

module.exports = { app, server }
