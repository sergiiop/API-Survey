const { app } = require('../index')
const supertest = require('supertest')
const User = require('../components/users/model')

const api = supertest(app)

const initialSurveys = [
  {
    name: 'Mi primera encuesta',
    description: 'Esta es una encuesta de prueba',
    questions: [
      {
        name: 'pregunta 1',
        type: 'combo',
        options: [
          {
            idx: 1,
            option: 'opcion 1'
          },
          {
            idx: 2,
            option: 'opcion 2'
          },
          {
            idx: 3,
            option: 'opcion 3'
          }
        ]
      },
      {
        name: 'pregunta 2',
        type: 'texto',
        options: null
      },
      {
        name: 'pregunta 3',
        type: 'combo',
        options: [
          {
            idx: 1,
            option: 'opcion 1'
          },
          {
            idx: 2,
            option: 'opcion 2'
          },
          {
            idx: 3,
            option: 'opcion 3'
          }
        ]
      }
    ]
  },
  {
    name: 'Mi segunda encuesta',
    description: 'Esta es otra encuesta de prueba',
    questions: [
      {
        name: 'pregunta 1',
        type: 'combo',
        options: [
          {
            idx: 1,
            option: 'opcion 1'
          },
          {
            idx: 2,
            option: 'opcion 2'
          },
          {
            idx: 3,
            option: 'opcion 3'
          }
        ]
      },
      {
        name: 'pregunta 2',
        type: 'texto',
        options: null
      },
      {
        name: 'pregunta 3',
        type: 'combo',
        options: [
          {
            idx: 1,
            option: 'opcion 1'
          },
          {
            idx: 2,
            option: 'opcion 2'
          },
          {
            idx: 3,
            option: 'opcion 3'
          }
        ]
      }
    ]
  },
  {
    name: 'Mi tercera encuesta',
    description: 'Esta es otra encuesta de prueba 4',
    questions: [
      {
        name: 'pregunta 1',
        type: 'combo',
        options: [
          {
            idx: 1,
            option: 'opcion 1'
          },
          {
            idx: 2,
            option: 'opcion 2'
          },
          {
            idx: 3,
            option: 'opcion 3'
          }
        ]
      },
      {
        name: 'pregunta 2',
        type: 'texto',
        options: null
      },
      {
        name: 'pregunta 3',
        type: 'combo',
        options: [
          {
            idx: 1,
            option: 'opcion 1'
          },
          {
            idx: 2,
            option: 'opcion 2'
          },
          {
            idx: 3,
            option: 'opcion 3'
          }
        ]
      }
    ]
  }
]

const getAllNameFromSurveys = async () => {
  const response = await api.get('/api/vi/surveys')
  return {
    contents: response.body.map(survey => survey.name),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialSurveys,
  getAllNameFromSurveys,
  getUsers
}
