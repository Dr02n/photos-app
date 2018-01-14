const GitHubStrategy = require('passport-github').Strategy
const User = require('../../models/User')

module.exports = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.APP_URL}/auth/github/callback`,
  scope: 'user:email'
},
async (accessToken, refreshToken, profile, cb) => {
  const email = profile.emails && profile.emails[0].value
  // const photo = profile.photos && profile.photos[0].value

  try {
    let user = await User.findOne({ email })

    if (!user) {
      user = new User({
        // displayName: profile.displayName || profile.username,
        email
      })

      await user.save()

      cb(null, user)
    } else {
      throw new Error('Email is in use')
    }

    // if (!user.githubId) user.githubId = profile.id
    // if (!user.githubProfileUrl) user.githubProfileUrl = profile.profileUrl
    // if (!user.avatar) user.avatar = photo
  } catch (err) {
    cb(err)
  }
})
