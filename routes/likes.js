const User = require('../models/User');

exports.put = async (ctx, next) => {
  const { user } = ctx.state;
  const { photo } = ctx.params;

  const operator = user.likes.find(like => like.toString() === photo) ? '$pull' : '$addToSet';
  await User.update({ _id: user.id }, { [operator]: { likes: photo } });

  ctx.redirect('back');
};
