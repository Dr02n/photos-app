const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');


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
  bio: {
    type: String,
    default: 'Lorem ipsum'
  },
  avatar: {
    type: String,
    default: '/img/default_avatar.jpg'
  },
  background: {
    type: String,
    default: '/img/no_album_cover.jpg'
  },
  resetPasswordToken: {
    type: String,
    index: true
  },
  resetPasswordExpires: Date,
  githubId: Number,
  githubProfileUrl: String,
  likes: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  }
}, {
  timestamps: true
});

User.virtual('albums', {
  ref: 'Album',
  localField: '_id',
  foreignField: 'author'
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);
