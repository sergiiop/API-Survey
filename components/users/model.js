const uniqueValidator = require('mongoose-unique-validator')
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
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
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

userSchema.plugin(uniqueValidator)

module.exports = User
