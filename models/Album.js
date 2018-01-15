const mongoose = require('mongoose')
// const Photo = require('../models/Photo')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  // cover: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Photo',
  //   required: true
  // },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true
})

albumSchema.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'album'
})

// Album.methods.populatePhotosCount = async function () {
//   this.photosCount = await Photo.find({album: {$in: [this.id]}}).count()
// }

function autopopulate(next) {
  this.populate('author')
  next()
}

albumSchema.pre('find', autopopulate)
albumSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Album', albumSchema)
