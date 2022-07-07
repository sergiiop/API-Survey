const express = require('express')

// const UsersService = require('./service')
// const validatorHandler = require('../../middlewares/validator.handler')
const SurveysService = require('./service')
const UsersService = require('../users/service')
// const {
//   getUserSchema,
//   createUserSchema,
//   updateUserSchema
// } = require('./schema')

const router = express.Router()
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
  // validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { name, description, questions, userId } = req.body
      const user = await userService.findbyId(userId)
      const newSurvey = await service.create(name, description, questions, user)
      res.status(201).json({
        message: 'Survey created successfully',
        newSurvey
      }).end()
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:surveyId',
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
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { surveyId } = req.params
      const rta = await service.delete(surveyId)
      res.status(204).json({
        message: 'Survey deleted successfully',
        rta
      }).end()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
