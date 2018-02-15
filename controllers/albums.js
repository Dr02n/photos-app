const Album = require('../models/Album')

exports.post = async(ctx) => {
  const { name, description } = ctx.request.body
  ctx.body = await Album.create({
    name,
    description,
    author: ctx.state.user
  })
}

exports.get = async(ctx) => {
  ctx.body = ctx.album
}

exports.patch = async(ctx) => {
  const { name, description } = ctx.request.body
  Object.assign(ctx.album, { name, description })
  ctx.body = await ctx.album.save()
}

exports.delete = async(ctx) => {
  await ctx.album.remove()
  // TODO remove photos
  ctx.body = { status: 'OK' }
}

exports.getByAuthor = async(ctx) => {
  ctx.body = await Album.find({ author: ctx.user.id }).populate('author')
}
