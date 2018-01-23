require('dotenv').config()
const Koa = require('koa')
const debug = require('debug')('app:http')
const router = require('./routes')
const mongoose = require('./modules/mongoose')
require('./modules/passport')

debug('booting app')

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
if (!process.env.APP_URL) process.env.APP_URL = 'http://localhost'

// Start server
const server = app.listen(process.env.PORT)
server.on('listening', () => debug('listening on ' + server.address().port))
server.on('close', () => mongoose.disconnect())

module.exports = server
