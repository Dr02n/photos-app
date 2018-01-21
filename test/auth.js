/* global describe, it, before, after, context, beforeEach */

process.env.MONGOOSE_DEBUG = false

const should = require('chai').should() // eslint-disable-line
const axios = require('axios')
const app = require('../app')
const mongoose = require('../modules/mongoose')
const User = require('../models/User')

axios.defaults.baseURL = 'http://localhost:3000'

let server
const testUser = {
  email: 'test@user.com',
  password: '123'
}

describe('Auth', function() {
  before(done => {
    server = app.listen(3000, done)
  })

  after(done => {
    server.close(done)
    mongoose.disconnect()
  })

  beforeEach(async () => {
    await User.remove()
  })

  describe('signup', function() {
    context('user don\'t provide email or password', function() {
      it('should return 422', async function() {
        try {
          await axios.post('/api/auth/signup', {email: '', password: ''})
        } catch(err) {
          err.response.status.should.be.equal(422)
        }
      })
    })

    context('user doesn\'t exist', function() {
      it('it should signup user', async function() {
        const res = await axios.post('/api/auth/signup', testUser)

        res.status.should.be.equal(200)
        res.data.should.have.property('token')
      })
    })

    context('user already exists', function() {
      it('should return 422', async function() {
        await axios.post('/api/auth/signup', testUser)

        try  {
          await axios.post('/api/auth/signup', testUser)
        } catch(err) {
          err.response.status.should.be.equal(422)
        }
      })
    })
  })

  describe('login', function() {
    context('user doesn\'t exist', function() {
      it('should return 401', async function () {
        try {
          await axios.post('/api/auth/login', testUser)
        } catch(err) {
          err.response.status.should.be.equal(401)
        }
      })
    })

    context('user exists', () => {
      it('should login user', async function () {
        await axios.post('/api/auth/signup', testUser)

        const res = await axios.post('/api/auth/login', testUser)

        res.status.should.be.equal(200)
        res.data.should.have.property('token')
      })
    })
  })

  describe('protected route', function() {
    context('unauthorized user', function() {
      it('should return 401', async function() {
        try {
          await axios.get('/api/users/me')
        } catch (err) {
          err.response.status.should.be.equal(401)
        }
      })
    })

    context('authorized user', async function() {
      it('should pass', async function() {
        const {data: {token}} = await axios.post('/api/auth/signup', testUser)
        const {status} = await axios.get('/api/users/me', {headers: {
          Authorization: token
        }})

        status.should.be.equal(200)
      })
    })
  })
})
