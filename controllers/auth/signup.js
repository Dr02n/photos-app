const User = require('../../models/User')
const getTokenForUser = require('../../utils/getTokenForUser')

module.exports = async ctx => {
  const {email, password} = ctx.request.body

  if (!email || !password) {
    ctx.throw(422, 'You must provide email and password')
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    ctx.throw(422, 'Email is in use')
  }

  const user = await User.create({email, password})

  ctx.body = {token: getTokenForUser(user)}
}
