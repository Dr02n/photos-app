const AuthenticationError = require('passport-local-mongoose').errors.AuthenticationError;


module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.set('X-Content-Type-Options', 'nosniff');

    const preferredType = ctx.accepts('html', 'json');

    if (err.name === 'ValidationError') {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      ctx.status = 400;
      ctx.body = (preferredType === 'json') ? { errors } : errors; // TBD: flash
    } else if (err instanceof AuthenticationError || err.name === 'InternalOAuthError') {
      ctx.status = 400;
      ctx.body = (preferredType === 'json') ? { error: err.message } : err.message; // TBD: flash
    } else {
      // set locals, only providing error in development
      ctx.state.message = err.message;
      ctx.state.error = process.env.NODE_ENV === 'development' ? err : {};
      // render the error page
      ctx.status = err.status || 500;
      (preferredType === 'json') ? ctx.body = { error: err.message } : ctx.render('error');
    }
  }
};
