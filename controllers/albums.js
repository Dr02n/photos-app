const mongoose = require('mongoose')
const Album = require('../models/Album')
const Photo = require('../models/Photo')

exports.loadAlbumByid = async (id, ctx, next) => {
  ctx.assert(mongoose.Types.ObjectId.isValid(id), 421, 'Not Found')

  ctx.album = await Album.findById(id)

  ctx.assert(ctx.album, 404, 'Not Found')

  await next()
}

exports.post = async (ctx) => {
  const {name, description} = ctx.request.body

  const album = await Album.create({
    name,
    description,
    author: ctx.state.user
  })

  ctx.body = album
}

exports.get = async (ctx) => {
  ctx.body = ctx.album
}

exports.patch = async (ctx) => {
  const {name, description} = ctx.request.body

  Object.assign(ctx.album, {name, description})

  await ctx.album.save()

  ctx.body = ctx.album
}

exports.delete = async (ctx) => {
  await ctx.album.remove()

  ctx.body = 'OK'
}
