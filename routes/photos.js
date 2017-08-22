const mongoose = require('mongoose');
const Photo = require('../models/Photo');

exports.loadPhotoById = async (id, ctx, next) => {
  ctx.assert(mongoose.Types.ObjectId.isValid(id), 404, 'Invalid link!');
  ctx.photo = await Photo.findById(id).populate('album');
  ctx.assert(ctx.photo, 404, 'Photo not found!');
  await next();
};

exports.put = async (ctx, next) => {
  // TBD
  const { name, url } = ctx.request.body;
  await Photo.create({ name, url, album: ctx.album });

  ctx.flash('success', 'Photo added');
  ctx.redirect('back');
};

exports.patch = async (ctx, next) => {
  const { name, description } = ctx.request.body;

  Object.assign(ctx.photo, { name, description });
  await ctx.photo.save();

  ctx.flash('success', 'Photo successfully updated');
  ctx.redirect('back');
};

exports.delete = async (ctx, next) => {
  if (ctx.photo.id === ctx.photo.album.cover.toString()) {
    ctx.flash('error', 'You can\'t remove album cover!');
  } else {
    await ctx.photo.remove();
    ctx.flash('success', 'Photo successfully removed');
  }
  ctx.redirect('back');
};
