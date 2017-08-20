const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const User = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [val => validator.isEmail(val), 'Invalid Email Address'],
    trim: true
  },
  about: {
    type: String,
    default: 'There is no description yet',
  },
  resetPasswordToken: {
    type: String,
    index: true
  },
  resetPasswordExpires: Date,
  githubId: Number,
  githubProfileUrl: String,
  photoUrl: String
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });
User.plugin(findOrCreate);

module.exports = mongoose.model('User', User);
