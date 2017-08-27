const mongoose = require('mongoose');
const fs = require('fs-extra');
var Jimp = require('jimp');


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
    required: true
  },
  extension: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

Photo.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'photo'
});

Photo.virtual('filename').get(function () {
  return `${this.id}.${this.extension}`;
});

Photo.virtual('destination').get(function () {
  return 'public/uploads/photos/';
});

Photo.virtual('path').get(function () {
  return this.destination + this.filename;
});

Photo.methods.saveToDisk = async function (readable) {
  const image = await Jimp.read(readable.path);
  // const { width, height } = image.bitmap;
  this.extension = image.getExtension();

  image
    // .scaleToFit(Math.min(width, 800), Math.min(height, 600))
    .write(this.path);

  fs.unlink(readable.path); // probably don't need to use fs.unlink(). The OS will do the clean up.

  await this.save();
};

Photo.pre('remove', async function(next) {
  await fs.unlink(this.path);
  next();
});

module.exports = mongoose.model('Photo', Photo);
