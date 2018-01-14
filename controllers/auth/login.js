const getTokenForUser = require('../../utils/getTokenForUser')

module.exports = (ctx) => {
  ctx.body = {token: getTokenForUser(ctx.state.user)}
}
