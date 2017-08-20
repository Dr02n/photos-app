const passport = require('koa-passport');


exports.get = (ctx) => {
  ctx.render('login');
};

exports.post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});
