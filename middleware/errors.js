// const AuthenticationError = require('passport-local-mongoose').errors.AuthenticationError

module.exports = async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.set('X-Content-Type-Options', 'nosniff')

    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).reduce((acc, key) => Object.assign(acc, {
        [key]: err.errors[key].message
      }), {})

      ctx.status = 422
      ctx.body = { errors }
      return
    }

    // if (err instanceof AuthenticationError || err.name === 'InternalOAuthError') {
    //   ctx.status = 401
    // }

    ctx.status = err.status || 500
    ctx.body = { error: err.message }

    if (ctx.status >= 500) console.error(err) // eslint-disable-line
  }
}
