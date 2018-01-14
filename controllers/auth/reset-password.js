const User = require('../../models/User')

exports.checkStatus = async (ctx, next) => {
  const {resetPasswordToken} = ctx.params
  const user = await User.findOne({resetPasswordToken})

  if (!user || user.resetPasswordExpires > Date.now) {
    ctx.throw(422, 'Password reset is invalid or has expired')
  }

  ctx.state.user = user

  await next()
}

exports.reset = async ctx => {
  const {password} = ctx.request.body
  const {user} = ctx.state

  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  await user.save()

  ctx.body = 'OK'
}

