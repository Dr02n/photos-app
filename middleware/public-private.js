exports.publicRoute = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.redirect('/')
  } else {
    await next()
  }
}

exports.privateRoute = async (ctx, next) => {
  if (ctx.isUnauthenticated()) {
    ctx.redirect('/login')
  } else {
    await next()
  }
}
