const GitHubStrategy = require('passport-github').Strategy
const User = require('../../../models/User')

module.exports = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: 'user:email'
},
async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails && profile.emails[0].value
    // const photo = profile.photos && profile.photos[0].value

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        email,
        githubId: profile.id,
        githubProfileUrl: profile.profileUrl
      })
    }

    cb(null, user)
  } catch (err) {
    cb(err)
  }
})
