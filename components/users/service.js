const User = require('./model')
const bcrypt = require('bcrypt')

class UsersService {
  async create (username, name, password) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    return savedUser
  }

  async find () {
    return await User.find({}).populate('surveys', {
      name: 1,
      description: 1,
      questions: 1
    })
  }

  async findByEmail (email) {

  }

  async findbyId (id) {
    return User.findById(id)
  }

  async update (id, changes) {

  }

  async delete (id) {

  }
}

module.exports = UsersService
