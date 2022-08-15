const express = require('express')

const usersRouter = require('../components/users/routes')
const surveysRouter = require('../components/surveys/routes')
const loginRouter = require('./auth')
// const profileRouter = require('./profile/routes')

const routerApi = app => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/surveys', surveysRouter)
  router.use('/users', usersRouter)
  router.use('/login', loginRouter)
  // router.use('/profile', profileRouter)
}

module.exports = routerApi
