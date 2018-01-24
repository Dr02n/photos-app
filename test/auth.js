/* global describe, it, before, after, beforeEach */

process.env.MONGOOSE_DEBUG = false

require('chai').should()
const axios = require('axios').create()
const server = require('../app')
const User = require('../models/User')
const promisify = require('../utils/promisify')

axios.defaults.baseURL = `http://localhost:${process.env.PORT}`

const testUser = {
  email: 'test@user.com',
  password: '123'
}

describe('Auth', () => {
  before(done => {
    if (server.listening) done()
    else server.on('listening', done)
  })

  after(done => {
    server.close(done)
  })

  beforeEach(async() => {
    await User.remove()
  })

  describe('signup', () => {
    it('should return 422 if user don\'t provide email or password', async() => {
      try {
        await axios.post('/api/auth/signup', { email: '', password: '' })
      } catch (err) {
        err.response.status.should.be.equal(422)
      }
    })

    it('it should signup user if user doesn\'t exist', async() => {
      const res = await axios.post('/api/auth/signup', testUser)

      res.status.should.be.equal(200)
      res.data.should.have.property('token')
    })

    it('should return 422 if user already exists', async() => {
      await axios.post('/api/auth/signup', testUser)

      try {
        await axios.post('/api/auth/signup', testUser)
      } catch (err) {
        err.response.status.should.be.equal(422)
      }
    })
  })

  describe('login', () => {
    it('should return 401 if user doesn\'t exist', async() => {
      try {
        await axios.post('/api/auth/login', testUser)
      } catch (err) {
        err.response.status.should.be.equal(401)
      }
    })

    it('should login user if user exists', async() => {
      await axios.post('/api/auth/signup', testUser)

      const res = await axios.post('/api/auth/login', testUser)

      res.status.should.be.equal(200)
      res.data.should.have.property('token')
    })
  })

  describe('protected route', () => {
    it('should return 401 if user is unauthorized', async() => {
      try {
        await axios.get('/api/users/me')
      } catch (err) {
        err.response.status.should.be.equal(401)
      }
    })

    it('should pass if user is authorized', async() => {
      const { data: { token } } = await axios.post('/api/auth/signup', testUser)
      const { status } = await axios.get('/api/users/me', {
        headers: {
          Authorization: token
        }
      })

      status.should.be.equal(200)
    })
  })

  describe('password', () => {
    it('user can update password on existing account', async() => {
      await axios.post('/api/auth/signup', testUser)
      await axios.post('/api/auth/password/forgot', { email: testUser.email })

      const { resetPasswordToken } = await User.findOne({ email: testUser.email })
      const password = 'newPassword'

      await axios.post('/auth/password/reset/' + resetPasswordToken, { password })

      const user = await User.findOne({ email: testUser.email })

      const passwordsMatch = await promisify(user.comparePassword, user)(password)

      passwordsMatch.should.be.equal(true)
    })

    it('user can\'t update password on account that doesn\'t exists', async() => {
      try {
        await axios.post('/api/auth/password/forgot', { email: 'not.existing@email.com' })
      } catch (err) {
        err.response.status.should.be.equal(404)
      }
    })

    it('user can\'t update password with wrong reset token', async() => {
      await axios.post('/api/auth/signup', testUser)
      await axios.post('/api/auth/password/forgot', { email: testUser.email })

      try {
        await axios.post('/auth/password/reset/' + 123, { password: 'newPassword' })
      } catch (err) {
        err.response.status.should.be.equal(422)
      }
    })
  })
})
