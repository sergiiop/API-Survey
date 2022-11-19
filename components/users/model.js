import uniqueValidator from 'mongoose-unique-validator'
import pkg from 'mongoose'
const { model, Schema } = pkg

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  surveys: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Survey'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
    delete returnedObject.surveys
  }
})

const User = model('User', userSchema)

userSchema.plugin(uniqueValidator)

export default User
