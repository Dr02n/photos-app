module.exports = async (ctx, next) => {
  const key = 'koa-flash'
  const data = ctx.session[key] || {}

  delete ctx.session[key]

  ctx.flash = ctx.state.flash = (type, html) => {
    if (type === undefined) return data || {}
    if (html === undefined) return data[type] || []
    if (!ctx.session[key]) ctx.session[key] = {}
    if (!ctx.session[key][type]) ctx.session[key][type] = []
    ctx.session[key][type].push(html)
  }

  await next()

  if (ctx.status === 302 && ctx.session && !ctx.session[key]) {
    ctx.session[key] = data
  }
}
