const Photo = require('../models/Photo')

exports.post = async(ctx) => {
  ctx.body = [ctx.req.files, ctx.req.file, ctx.req.body]
}

exports.patch = async(ctx) => {
  const { name, description } = ctx.request.body
  Object.assign(ctx.photo, { name, description })
  await ctx.photo.save()
  ctx.body = ctx.photo
}

exports.delete = async(ctx) => {
  // TBD
}
