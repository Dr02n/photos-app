const User = require('../models/User');
const crypto = require('crypto');


exports.get = (ctx) => {
  ctx.render('forgot-password');
}

exports.post = async (ctx) => {
  const { email } = ctx.request.body;
  const user = await User.findOne({ email });
  if (!user) ctx.throw(404, 'Can\'t find that email, sorry.');

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();

  // TODO: send email

  // ctx.state.flash('success', 'password reset instructions were send to your email.');
  // ctx.redirect('/login');

  ctx.redirect(`/reset-password/${user.id}/${user.resetPasswordToken}`);
}
