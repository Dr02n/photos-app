const passport = require('koa-passport');


exports.get = passport.authenticate('github');

exports.getCallback = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})
