require('dotenv').config()
const Koa = require('koa')
const debug = require('debug')('app:http')
const router = require('./routes')
require('./modules/passport')
require('./modules/mongoose')

debug('start')

const app = new Koa()

// Set middlewares
// app.use(require('koa-favicon')('public/favicon.ico'))
app.use(require('koa-static')('public'))
app.use(require('koa-logger')())
app.use(require('./middleware/errors'))
app.use(require('koa-bodyparser')())
// app.use(require('./middleware/multipart'))
// app.use(passport.initialize())
// app.use(require('./middleware/flash'))
// app.use(new (require('koa-csrf'))())
// app.use(async (ctx, next) => {
//   ctx.state.csrf = ctx.csrf
//   await next()
// })

// Bootstrap application router
app.use(router.routes())
app.use(router.allowedMethods())

// Start server
const server = app.listen(process.env.PORT || 3000)
server.on('listening', () => debug('Listening on ' + server.address().port))
