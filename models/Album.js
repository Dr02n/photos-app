const mongoose = require('mongoose')
const Photo = require('./Photo')

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
  },
  photosCount: Number
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

albumSchema.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'album'
})

albumSchema.virtual('cover', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'album',
  justOne: true
})

albumSchema.methods.populatePhotosCount = async function () {
  this.photosCount = await Photo.find({ album: { $in: [this.id] } }).count()
}

function autopopulate(next) {
  // this.populate('author')
  next()
}

albumSchema.pre('find', autopopulate)
albumSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Album', albumSchema)
