exports.get = (ctx) => {
  ctx.logout();
  ctx.redirect('/login');
};
