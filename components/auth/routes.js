import { Router } from 'express'
// const passport = require('passport')
import UserService from '../users/service.js'

const router = Router()
const service = new UserService()

router.post(
  '/signup',
  // validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const { firstName, lastName, email, password, confirmPassword } = body
      const user = await service.signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      )

      res.status(201).json({
        message: 'User created successfully',
        user
      })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/signin',
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await service.signIn(email, password)
      res.send({
        user
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
