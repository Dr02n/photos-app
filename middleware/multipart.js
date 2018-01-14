const asyncBusboy = require('async-busboy')

module.exports = async (ctx, next) => {
  if (!ctx.request.is('multipart/*')) return next()

  const { files, fields } = await asyncBusboy(ctx.req, {
    limits: {
      // fileSize: 1000
      // files: 2
    }
  })

  ctx.request.body = fields
  ctx.request.files = files

  await next()
};
