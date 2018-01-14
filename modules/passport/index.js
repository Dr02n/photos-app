const passport = require('koa-passport')

passport.use(require('./strategies/jwt'))
passport.use(require('./strategies/local'))
// passport.use(require('./strategies/github'))

module.exports = passport
