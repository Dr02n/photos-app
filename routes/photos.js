const mongoose = require('mongoose');
const Photo = require('../models/Photo');
const fs = require('fs-extra');


exports.filterImages = async (ctx, next) => {
  if (ctx.request.files) {
    ctx.request.files = ctx.request.files.filter(readable => {
      const isImage = readable.mime.startsWith('image/');
      if (isImage) return readable;
      fs.unlink(readable.path); // probably don't need to use fs.unlink(). The OS will do the clean up.
    });
  }
  await next();
};

exports.loadPhotoById = async (id, ctx, next) => {
  ctx.assert(mongoose.Types.ObjectId.isValid(id), 404, 'Invalid link!');
  ctx.photo = await Photo.findById(id);
  ctx.assert(ctx.photo, 404, 'File not found!');
  await next();
};

exports.put = async (ctx, next) => {
  await Promise.all(ctx.request.files.map(readable =>
    Photo.createAndSaveToDisk({ album: ctx.album }, readable)
  ));
  ctx.flash('success', `${ctx.request.files.length} photos added`);
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
  await ctx.photo.populate('album', 'cover').execPopulate();
  if (ctx.photo.id === ctx.photo.album.cover.toString()) {
    ctx.flash('error', 'You can\'t remove album cover!');
  } else {
    await ctx.photo.removeFromDiskAndDb();
    ctx.flash('success', 'Photo successfully removed');
  }
  ctx.redirect('back');
};
