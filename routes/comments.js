const Comment = require('../models/Comment');

exports.put = async (ctx, next) => {
  await Comment.create({
    author: ctx.state.user,
    photo: ctx.params.photo,
    text: ctx.request.body.text
  });

  ctx.redirect('back');
};
