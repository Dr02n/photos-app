const mongoose = require('mongoose');
const fs = require('fs-extra');
const Jimp = require('jimp');
const User = require('./User');


const Photo = new mongoose.Schema({
  name: {
    type: String,
    default: 'No name'
  },
  description: {
    type: String,
    default: 'Lorem ipsum'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    index: true
  },
  extension: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

/**
 * VIRTUALS
 */

Photo.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'photo'
});

Photo.virtual('filename').get(function () {
  return `${this.id}.${this.extension}`;
});

Photo.virtual('path').get(function () {
  return 'public/uploads/photos/' + this.filename;
});

Photo.virtual('url').get(function () {
  return '/uploads/photos/' + this.filename;
});

/**
 * STATICS
 */

Photo.statics.createAndSaveToDisk = async function (fields, readable) {
  const image = await Jimp.read(readable.path);
  // const { width, height } = image.bitmap;
  const photo = new this(fields);
  photo.extension = image.getExtension();
  image
    // .scaleToFit(Math.min(width, 800), Math.min(height, 600))
    .write(photo.path);
  fs.unlink(readable.path); // probably don't need to use fs.unlink(). The OS will do the clean up.
  await photo.save();
  return photo;
};

Photo.statics.removeFromDisk = async function (query) {
  const photos = await this.find(query);
  await Promise.all(photos.map(photo => photo.removeFromDisk()));
};

Photo.statics.removeFromDiskAndDb = async function (query) {
  await this.removeFromDisk(query);
  await this.remove(query);
};

/**
 * METHODS
 */

Photo.methods.removeFromDisk = async function () {
  await fs.unlink(this.path);
};

Photo.methods.removeFromDiskAndDb = async function () {
  await this.removeFromDisk();
  await this.remove();
};

Photo.methods.populateLikesCount = async function () {
  this.likesCount = await User.find({ likes: { $in: [this.id] } }).count();
};

Photo.methods.isLiked = function (user) {
  return !!user.likes.find(like => like.toString() === this.id);
};

module.exports = mongoose.model('Photo', Photo);
