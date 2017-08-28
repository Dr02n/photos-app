const mongoose = require('mongoose');
const Photo = require('../models/Photo');


const Album = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Lorem ipsum'
  },
  cover: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo',
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

Album.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'album'
});

Album.methods.populatePhotosCount = async function () {
  this.photosCount = await Photo.find({album: {$in: [this.id]}}).count();
};

module.exports = mongoose.model('Album', Album);
