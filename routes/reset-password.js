const User = require('../models/User');
const promisify = require('../promisify');


exports.get = (ctx) => {
  ctx.render('reset-password');
}

exports.post = async (ctx) => {
  const { password } = ctx.request.body;
  const user = await promisify(ctx.user.setPassword, ctx.user)(password);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  ctx.flash('success', 'Your password has been reset');
  ctx.redirect('/login');
}

exports.checkPasswordResetStatus = async (ctx, next) => {
  const { userId, token } = ctx.params;
  const user = await User.findById(userId);

  if (!user ||
    user.resetPasswordToken !== token ||
    user.resetPasswordExpires > Date.now
  ) {
    ctx.flash('error', 'Password reset is invalid or has expired!');
    ctx.redirect('/login');
    return;
  }

  ctx.user = user;
  await next();
}
