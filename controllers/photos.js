const fs = require('fs')
const Photo = require('../models/Photo')

exports.post = async(ctx) => {
  const { originalName, path, size, mimetype } = ctx.req.file
  const { album } = ctx.params

  ctx.body = await Photo.create({
    author: ctx.state.user,
    name: originalName,
    path: path.replace('public', ''),
    size,
    mimetype,
    album
  })
}

exports.patch = async(ctx) => {
  const { name, description } = ctx.request.body
  Object.assign(ctx.photo, { name, description })
  await ctx.photo.save()
  ctx.body = ctx.photo
}

exports.delete = async(ctx) => {
  fs.unlinkSync('public' + ctx.photo.path)
  await ctx.photo.remove()
  ctx.body = 'OK'
}

exports.getByAlbum = async(ctx) => {
  ctx.body = await Photo.find({ album: ctx.params.album }).populate('author').populate('album')
}
