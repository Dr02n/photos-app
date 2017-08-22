const mongoose = require('mongoose');
const Album = require('../models/Album');
const Photo = require('../models/Photo');

exports.loadAlbumByid = async (id, ctx, next) => {
  ctx.assert(mongoose.Types.ObjectId.isValid(id), 404, 'Invalid link!');
  ctx.album = await Album.findById(id).populate('photos');
  ctx.assert(ctx.album, 404, 'Album not found!');
  await next();
};

exports.put = async (ctx, next) => {
  // TBD: album cover
  const { name, description } = ctx.request.body;
  const album = new Album({ name, description, author: ctx.state.user });
  const cover = await Photo.create({ name: 'Noname', url: '/img/no_photo.jpg', album });
  album.cover = cover;
  await album.save();

  ctx.redirect(`/albums/${album.id}`);
};

exports.get = async (ctx, next) => {
  ctx.render('album', { album: ctx.album });
};

exports.patch = async (ctx, next) => {
  // TBD: album cover
  const { name, description } = ctx.request.body;
  Object.assign(ctx.album, { name, description });
  await ctx.album.save();

  ctx.flash('success', 'Album successfully updated');
  ctx.redirect('back');
};

exports.delete = async (ctx, next) => {
  await Promise.all(ctx.album.photos.map((photo) => photo.remove()));
  await ctx.album.remove();

  ctx.flash('success', 'Album successfully removed');
  ctx.redirect('/');
};
