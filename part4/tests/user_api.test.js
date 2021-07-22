const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ _id: '60f97af8b60997496a244591', username: 'root', passwordHash })

    await user.save()
})

describe('when there is initially one user in db', () => {
  
  test('Reading users is fine', async () => {

    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)

  })

  test('creation succeeds with a fresh username', async () => {
    const initialResponse = await api.get('/api/users')

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialResponse.body.length + 1)

    const usernames = response.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('invalid user with short username', async () => {
    const newUser = {
      username: 'us',
      password: 'salainen'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`username` (`us`) is shor')
  })

  test('invalid user with short password', async () => {
    const newUser = {
      username: 'alberto',
      password: 'sa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('password must be at least 3 characters long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})