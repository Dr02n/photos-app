const mongoose = require('mongoose')

module.exports = (model) => async (id, ctx, next) => {
  ctx.assert(mongoose.Types.ObjectId.isValid(id), 422)
  ctx[model.toLowerCase()] = await mongoose.model(model).findById(id)
  ctx.assert(ctx[model.toLowerCase()], 404)
  await next()
}
