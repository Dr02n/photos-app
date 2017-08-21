const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', Comment);
