import { Router } from 'express'

import usersRouter from '../components/users/routes.js'
import surveysRouter from '../components/surveys/routes.js'
import authRouter from '../components/auth/routes.js'
// const profileRouter = require('./profile/routes')

const routerApi = (app) => {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/surveys', surveysRouter)
  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
  // router.use('/profile', profileRouter)
}

export default routerApi
