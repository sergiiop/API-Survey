const { model, Schema } = require('mongoose')

const surveySchema = new Schema({
  name: String,
  description: String,
  questions: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

surveySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Survey = model('Survey', surveySchema)

module.exports = Survey
