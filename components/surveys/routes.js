import { Router } from 'express'
// const UsersService = require('./service')
// const validatorHandler = require('../../middlewares/validator.handler')
import SurveysService from './service.js'
import UsersService from '../users/service.js'
import userExtractor from '../../middlewares/userExtractor.js'
// const {
//   getUserSchema,
//   createUserSchema,
//   updateUserSchema
// } = require('./schema')

const router = Router()
const service = new SurveysService()
const userService = new UsersService()

router.get('/', async (req, res) => {
  const surveys = await service.find()
  res.json(surveys)
})

router.get(
  '/:surveyId',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { surveyId } = req.params
      const survey = await service.findOne(surveyId)
      res.json(survey)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  userExtractor,
  // validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { name, description, questions } = req.body
      // sacar userId de request
      const { userId } = req
      const user = await userService.findbyId(userId)
      const newSurvey = await service.create(name, description, questions, user)
      res
        .status(201)
        .json({
          message: 'Survey created successfully',
          newSurvey
        })
        .end()
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:surveyId',
  userExtractor,
  // validatorHandler(getUserSchema, 'params'),
  // validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { surveyId } = req.params
      const body = req.body
      const survey = await service.update(surveyId, body)
      res.json({
        message: 'Survey updated successfully',
        survey
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:surveyId',
  userExtractor,
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { surveyId } = req.params
      const rta = await service.delete(surveyId)
      res
        .status(204)
        .json({
          message: 'Survey deleted successfully',
          rta
        })
        .end()
    } catch (error) {
      next(error)
    }
  }
)

export default router
