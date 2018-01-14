const LocalStrategy = require('passport-local')
const User = require('../../../models/User')

const localStrategy = new LocalStrategy({
  usernameField: 'email'
},
function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err) }

    if (!user) { return done(null, false) }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }

      if (!isMatch) { return done(null, false) }

      done(null, user)
    })
  })
})

module.exports = localStrategy
