const mongoose = require('mongoose');


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

module.exports = mongoose.model('Album', Album);
