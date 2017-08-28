const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs-extra');
const Jimp = require('Jimp');


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
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Photo',
    index: true
  }]
}, {
  timestamps: true
});

User.virtual('albums', {
  ref: 'Album',
  localField: '_id',
  foreignField: 'author'
});

User.methods.saveAvatarToDisk = async function(readable) {
  const image = await Jimp.read(readable.path);
  const extension = image.getExtension();
  const path = `/uploads/avatars/${this.id}.${extension}`;
  image
    .cover(300, 300)
    .write('public' + path);
  fs.unlink(readable.path); // probably don't need to use fs.unlink(). The OS will do the clean up.
  return path;
};

User.methods.saveBackgroundToDisk = async function(readable) {
  const image = await Jimp.read(readable.path);
  const extension = image.getExtension();
  const path = `/uploads/backgrounds/${this.id}.${extension}`;
  image
    .cover(1349, 400)
    .write('public' + path);
  fs.unlink(readable.path); // probably don't need to use fs.unlink(). The OS will do the clean up.
  return path;
};

User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);
