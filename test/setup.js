/* global before, after */

process.env.MONGOOSE_DEBUG = false

const server = require('../app')

before(done => {
  server.listening ? done() : server.on('listening', done)
})

after(done => {
  server.close(done)
})
