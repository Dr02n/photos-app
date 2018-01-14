const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../../../models/User')

const jwtStrategy = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
},
function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false) }

    if (!user) { return done(null, false) }

    return done(null, user)
  })
})

module.exports = jwtStrategy
