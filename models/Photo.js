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

Photo.virtual('path').get(function () {
  return '/uploads/photos/' + this.filename;
});

Photo.statics.createAndSaveToDisk = async function(fields, readable) {
  const photo = new this(fields);
  const image = await Jimp.read(readable.path);
  // const { width, height } = image.bitmap;
  photo.extension = image.getExtension();
  image
    // .scaleToFit(Math.min(width, 800), Math.min(height, 600))
    .write('public' + photo.path);
  fs.unlink(readable.path); // probably don't need to use fs.unlink(). The OS will do the clean up.
  await photo.save();
  return photo;
};

Photo.statics.removeFromDiskAndDbByAlbumId = async function(album) {
  const photos = await this.find({ album });
  await Promise.all(photos.map(photo => fs.unlink('public' + photo.path)));
  await this.remove({ album });
};

Photo.methods.removeFromDiskAndDb = async function () {
  await fs.unlink('public' + this.path);
  await this.remove();
};

module.exports = mongoose.model('Photo', Photo);
