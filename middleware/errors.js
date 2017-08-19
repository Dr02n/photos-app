const AuthenticationError = require('passport-local-mongoose').errors.AuthenticationError;


module.exports = () => async (ctx, next) => {
  try {

    await next();

  } catch (e) {
    ctx.set('X-Content-Type-Options', 'nosniff');

    const preferredType = ctx.accepts('html', 'json');

    if (e.status) {
      ctx.status = e.status;
      ctx.body = (preferredType === 'json') ? { error: e.message } : e.message;  // TODO

    } else if (e.name === 'ValidationError') {
      const errors = {};
      for (let field in e.errors) {
        errors[field] = e.errors[field].message;
      }
      ctx.status = 400;
      ctx.body = (preferredType === 'json') ? { errors } : errors; //'Incorrect data!'; // TODO

    } else if (e instanceof AuthenticationError) {
      ctx.status = 400;
      ctx.body = (preferredType === 'json') ? { error: e.message } : e.message; // TODO

    } else if (e.name === 'InternalOAuthError') {
      ctx.status = 400;
      ctx.body = (preferredType === 'json') ? { error: e.message } : e.message; // TODO

    } else {
      ctx.status = 500;
      ctx.body = process.env.NODE_ENv === 'development' ? e.stack : 'Error 500';
      console.error(e);
    }
  }
};
