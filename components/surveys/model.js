import pkg from 'mongoose'
const { model, Schema } = pkg

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

export default Survey
