import { Router } from 'express'

import UsersService from './service.js'
// const validatorHandler = require('../../middlewares/validator.handler')

// const {
//   getUserSchema,
//   createUserSchema,
//   updateUserSchema
// } = require('./schema')

const router = Router()
const service = new UsersService()

router.get('/', async (req, res) => {
  console.log('entre')
  const users = await service.find()
  res.json(users)
})

router.get(
  '/:userId',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params
      const user = await service.findOne(userId)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:userId',
  // validatorHandler(getUserSchema, 'params'),
  // validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params
      const body = req.body
      const user = await service.update(userId, body)
      res.json({
        message: 'User updated successfully',
        user
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:userId',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params
      const rta = await service.delete(userId)
      res.json({
        message: 'User deleted successfully',
        rta
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
