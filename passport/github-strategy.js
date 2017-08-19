const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');


module.exports = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: 'user:email'
},
  async function (accessToken, refreshToken, profile, cb) {
    const email = profile.emails && profile.emails[0].value;
    const photo = profile.photos && profile.photos[0].value;

    try {
      let user = await User.findOne({ email });

      if (!user) user = new User({
        displayName: profile.displayName || profile.username,
        email
      });

      if (!user.githubId) user.githubId = profile.id;
      if (!user.githubProfileUrl) user.githubProfileUrl = profile.profileUrl;
      if (!user.photUrl) user.photoUrl = photo;

      await user.save();

      return cb(null, user);

    } catch (err) {
      done(err);
    }
  }
)
