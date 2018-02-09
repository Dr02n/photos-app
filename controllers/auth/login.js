const pug = require('pug')
const getTokenForUser = require('../../utils/getTokenForUser')

exports.local = (ctx) => {
  ctx.body = { token: getTokenForUser(ctx.state.user) }
}

exports.oauth = (ctx) => {
  ctx.body = pug.renderFile('templates/authenticated.pug', {
    token: getTokenForUser(ctx.state.user)
  })
}
