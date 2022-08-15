const User = require('./model')
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const { config } = require('../../config/config')

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
    console.log('find')
    return await User.find({}).populate('surveys', {
      name: 1,
      description: 1,
      questions: 1
    })
  }

  async findOne (username, password) {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) throw boom.unauthorized('Invalid username or password')

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7
    })

    return {
      name: user.name,
      username: user.username,
      token
    }
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
