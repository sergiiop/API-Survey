import pkg from 'mongoose'
import { config } from '../config/config.js'
const { connect } = pkg

const MONGO_URI = config.dbUrl

// conexion a mongodb

connect(MONGO_URI)
  .then(() => {
    console.log('Database Connection established')
  })
  .catch((err) => console.error(err))

// process.on('uncaughtException', () => {
//   mongoose.disconnect()
// })
