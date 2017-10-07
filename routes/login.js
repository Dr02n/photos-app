const passport = require('koa-passport');


exports.get = (ctx) => {
  ctx.render('auth/login');
};

exports.post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});
