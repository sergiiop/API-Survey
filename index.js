import './lib/mongo.js'
import express, { json } from 'express'
import routerApi from './routes/index.js'
import { config } from './config/config.js'
import cors from 'cors'

// const passport = require('passport')

import {
  errorHandler,
  logErrors,
  boomErrorHandler
} from './middlewares/error.handler.js'
import notFoundHandler from './middlewares/notFound.handler.js'

// const { checkApiKey } = require('./middlewares/auth.handler')

const app = express()
const port = config.port

app.use(json())

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
app.use(cors())

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

export default { app, server }
