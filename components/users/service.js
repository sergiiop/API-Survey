import User from './model.js'
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import { config } from '../../config/config.js'

class UsersService {
  async signUp(firstName, lastName, email, password, confirmPassword) {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw boom.notFound('User not found')
    }

    if (password !== confirmPassword) {
      throw boom.forbidden('Password don`t match.')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: passwordHash
    })

    const token = jwt.sign(
      { email: user.email, id: user._id },
      config.jwtSecret,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )

    return {
      user,
      token
    }
  }

  async findByEmail(email) {
    const existingUser = await User.findOne({ email })

    if (!existingUser) return null

    return existingUser
  }

  async find() {
    console.log('find')
    return await User.find({}).populate('surveys', {
      name: 1,
      description: 1,
      questions: 1
    })
  }

  async signIn(email, password) {
    const user = await User.findOne({ email })

    if (!user) {
      throw boom.unauthorized('User doesn`t exist.')
    }

    const isPasswordCorret = await bcrypt.compare(password, user.password)
    if (!(user && isPasswordCorret)) {
      throw boom.unauthorized('Invalid username or password')
    }

    const userForToken = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(userForToken, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7
    })

    return {
      user,
      token
    }
  }

  async findbyId(id) {
    return User.findById(id)
  }

  async update(id, changes) {}

  async delete(id) {}
}

export default UsersService
