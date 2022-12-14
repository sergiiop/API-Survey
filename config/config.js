import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3001,
  dbUrl:
    process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_URI_TEST
      : process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET
}

export { config }
