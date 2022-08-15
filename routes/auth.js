const express = require('express')
// const passport = require('passport')
const UserService = require('../components/users/service')

const router = express.Router()
const service = new UserService()

router.post(
  '/',
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    console.log('entre')
    try {
      const { username, password } = req.body
      const user = await service.findOne(username, password)

      res.send({
        user
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
