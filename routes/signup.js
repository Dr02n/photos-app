const User = require('../models/User');
const promisify = require('../promisify');


exports.get = (ctx) => {
  ctx.render('signup');
}

exports.post = async (ctx) => {
  const { displayName, email, password, password2 } = ctx.request.body;

  if (password !== password2) ctx.throw(400, 'Passwords do not match!');

  const user = await promisify(User.register, User)(new User({ displayName, email }), password);

  ctx.flash('success', 'Your account has been created');
  await ctx.login(user);
  ctx.redirect('/');
}
