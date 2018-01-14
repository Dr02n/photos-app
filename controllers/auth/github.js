const pug = require('pug')
const generateTokenForUser = require('../../utils/getTokenForUser')

module.exports = (ctx) => {
  ctx.body = pug.renderFile('templates/authenticated.pug', {
    token: generateTokenForUser(ctx.state.user)
  })
}
