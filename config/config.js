require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3001,
  dbUrl: process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET
}

module.exports = { config }
