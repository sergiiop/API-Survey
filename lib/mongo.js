const mongoose = require('mongoose')

const { config } = require('../config/config')

const MONGO_URI = config.dbUrl

// conexion a mongodb

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Database Connection established')
  }).catch(err => console.error(err))

// process.on('uncaughtException', () => {
//   mongoose.disconnect()
// })
