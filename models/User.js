const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
// const passportLocalMongoose = require('passport-local-mongoose')
// const fs = require('fs-extra')
// const Jimp = require('Jimp')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [val => validator.isEmail(val), 'Invalid Email Address'],
    trim: true
  },
  password: String,
  resetPasswordToken: {
    type: String,
    index: true
  },
  resetPasswordExpires: Date,
  // username: {
  //   type: String,
  // required: true
  // },
  // bio: String,
  // avatar: String,
  // background: String,
  // githubId: Number,
  // githubProfileUrl: String,
  // likes: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Photo',
  //   index: true
  // }]
}, {
  timestamps: true
})
/*

User.virtual('albums', {
  ref: 'Album',
  localField: '_id',
  foreignField: 'author'
})

User.methods.saveAvatarToDisk = async function(readable) {
  const image = await Jimp.read(readable.path)
  const extension = image.getExtension()
  const path = `/uploads/avatars/${this.id}.${extension}`
  image
    .cover(300, 300)
    .write('public' + path)
  fs.unlink(readable.path) // probably don't need to use fs.unlink(). The OS will do the clean up.
  return path
}

User.methods.saveBackgroundToDisk = async function(readable) {
  const image = await Jimp.read(readable.path)
  const extension = image.getExtension()
  const path = `/uploads/backgrounds/${this.id}.${extension}`
  image
    .cover(1349, 400)
    .write('public' + path)
  fs.unlink(readable.path) // probably don't need to use fs.unlink(). The OS will do the clean up.
  return path
}
*/

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this

  if (! user.isModified('password')) return next()

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err)

      user.password = hash

      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
