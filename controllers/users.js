const mongoose = require('mongoose')
const User = require('../models/User')
const Album = require('../models/Album')


exports.loadUserById = async (id, ctx, next) => {
  ctx.assert(mongoose.Types.ObjectId.isValid(id), 404, 'Invalid link!')

  ctx.user = await User.findById(id)
  ctx.assert(ctx.user, 404, 'User not found!')

  await next()
}

exports.get = async (ctx, next) => {
  await ctx.user.populate('albums').execPopulate()
  await Album.populate(ctx.user.albums, 'cover')
  await Album.populate(ctx.user.albums, 'photos')

  ctx.render('users/show', {
    currentUser: ctx.user,
    title: ctx.user.displayName
  })
}

exports.patch = async (ctx, next) => {
  const { displayName, bio } = ctx.request.body
  const avatar = ctx.request.files.find(element => element.fieldname === 'avatar')
  const background = ctx.request.files.find(element => element.fieldname === 'background')

  Object.assign(ctx.user, { displayName, bio })
  if (avatar) {
    ctx.user.avatar = await ctx.user.saveAvatarToDisk(avatar)
  }
  if (background) {
    ctx.user.background = await ctx.user.saveBackgroundToDisk(background)
  }
  await ctx.user.save()

  ctx.flash('success', 'User updated')
  ctx.redirect('back')
}
