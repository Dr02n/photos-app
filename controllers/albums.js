const Album = require('../models/Album')

exports.post = async(ctx) => {
  const { name, description } = ctx.request.body
  const album = await Album.create({
    name,
    description,
    author: ctx.state.user
  })
  ctx.body = album
}

exports.get = async(ctx) => {
  ctx.body = ctx.album
}

exports.patch = async(ctx) => {
  const { name, description } = ctx.request.body
  Object.assign(ctx.album, { name, description })
  await ctx.album.save()
  ctx.body = ctx.album
}

exports.delete = async(ctx) => {
  await ctx.album.remove()
  ctx.body = 'OK'
}

exports.getByAuthor = async(ctx) => {
  ctx.body = await Album.find({ author: ctx.user.id }).populate('author')
}
