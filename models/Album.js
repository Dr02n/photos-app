const mongoose = require('mongoose');
const Photo = require('./Photo');


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
    required: true
  }
}, {
  timestamps: true
});

Album.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'album'
});

Album.pre('remove', function(next) {
  Photo.remove({album: this.id})
    .then(() => next())
    .catch(err => next(err));
});

module.exports = mongoose.model('Album', Album);
