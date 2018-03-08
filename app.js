// Load .env file first
const fs = require('fs')
if (!fs.existsSync('.env')) {
  throw new Error('.env file does not exist')
}
require('dotenv').config()

const Koa = require('koa')
const router = require('./routes')
const mongoose = require('./modules/mongoose')
require('./modules/passport')

const app = new Koa()

// Set middlewares
// app.use(require('koa-favicon')('public/favicon.ico'))
app.use(require('koa-static')('public'))
app.use(require('koa-logger')())
app.use(require('koa-bodyparser')())
app.use(require('./middleware/errors'))

// Bootstrap application router
app.use(router.routes())
app.use(router.allowedMethods())

// Set defaults
if (!process.env.PORT) process.env.PORT = 3000

// Start server
const server = app.listen(process.env.PORT)
server.on('listening', () => console.log('listening on http://localhost:' + server.address().port)) // eslint-disable-line
server.on('close', () => mongoose.disconnect())

module.exports = server
