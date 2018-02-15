// const User = require('../models/User')

exports.get = async (ctx) => {
  ctx.body = ctx.user
}

exports.getMe = async (ctx) => {
  ctx.body = ctx.state.user
}

exports.patch = async (ctx) => {
}
