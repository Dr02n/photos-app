const User = require('../models/User');
const crypto = require('crypto');
const sendMail = require('../nodemailer');


exports.get = (ctx) => {
  ctx.render('forgot-password');
};

exports.post = async (ctx) => {
  const { email } = ctx.request.body;
  const user = await User.findOne({ email });
  if (!user) ctx.throw(404, 'Can\'t find that email, sorry.');

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();

  const url = `${process.env.APP_URL}/reset-password/${user.resetPasswordToken}`;

  await sendMail(user.email, 'Password Reset', 'reset-password', { url });

  ctx.state.flash('success', 'Password reset instructions were send to your email.');
  ctx.redirect('/login');
};
