module.exports = async (ctx, next) => {
  const { _method } = ctx.request.body;

  if (_method) {
    ctx.request.method = _method;
    delete ctx.request.body._method;
  }

  await next();
};
