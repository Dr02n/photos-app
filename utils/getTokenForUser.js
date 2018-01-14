const jwt = require('jwt-simple')

module.exports = (user) => jwt.encode({
  sub: user.id,
  iat: new Date().getTime(),
  email: user.email
}, process.env.JWT_SECRET)
