const User = require('../../models/User')
const promisify = require('../../utils/promisify')


exports.get = ctx => {
  ctx.render('auth/reset-password')
}

exports.post = async ctx => {
  const { password } = ctx.request.body
  const user = await promisify(ctx.user.setPassword, ctx.user)(password)

  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save()

  ctx.flash('success', 'Your password has been reset')
  ctx.redirect('/login')
}

exports.checkStatus = async (resetPasswordToken, ctx, next) => {
  const user = await User.findOne({ resetPasswordToken })

  if (!user || user.resetPasswordExpires > Date.now) {
    ctx.flash('error', 'Password reset is invalid or has expired!')
    ctx.redirect('/login')
    return
  }

  ctx.user = user
  await next()
}
