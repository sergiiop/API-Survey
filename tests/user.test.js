const User = require('../components/users/model')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helpers')

describe.only('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User(
      { username: 'sergioroot', name: 'yo', passwordHash }
    )

    await user.save()
  })

  test('works as expect creating a fresh username', async () => {
    const usersAtStart = await getUsers()
    const newUser = {
      username: 'sergioyo',
      name: 'Sergio2',
      password: 'micontra'
    }

    await api
      .post('/api/v1/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)

    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'sergioroot',
      name: 'Sergio',
      password: 'micontraww'
    }

    const result = await api.post('/api/v1/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
