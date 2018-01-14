const passport = require('koa-passport')

exports.get = passport.authenticate('github')

exports.callback = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})
