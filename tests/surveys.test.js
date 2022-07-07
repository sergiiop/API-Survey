const mongoose = require('mongoose')

const { server } = require('../index')
const Survey = require('../components/surveys/model')

const {
  api,
  initialSurveys
} = require('./helpers')

beforeEach(async () => {
  await Survey.deleteMany({})

  for (const survey of initialSurveys) {
    const surveyObject = new Survey(survey)
    await surveyObject.save()
  }
})

test('surveys are returned as json', async () => {
  await api
    .get('/api/v1/surveys')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('surveys are three surveys', async () => {
  const response = await api.get('/api/v1/surveys')
  expect(response.body).toHaveLength(initialSurveys.length)
})

test('the first surve the name is Mi primera encuesta', async () => {
  const response = await api.get('/api/v1/surveys')
  const names = response.body.map(survey => survey.name)
  expect(names).toContain('Mi primera encuesta')
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
