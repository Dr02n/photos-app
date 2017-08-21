const mongoose = require('mongoose');

const Photo = new mongoose.Schema({
  name: String,
  description: {
    type: String,
    default: 'Lorem ipsum'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  url: {
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

module.exports = mongoose.model('Photo', Photo);
