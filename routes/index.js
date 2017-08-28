const Photo = require('../models/Photo');
const Album = require('../models/Album');


exports.get = async (ctx, next) => {
  // const albums = await Album.find({author: ctx.state.user.id}).populate('cover').populate('photos', 'id');
  const { user } = ctx.state;
  await user.populate({ path: 'albums', populate: { path: 'cover' } }).execPopulate();
  // await Album.populate(user.albums, 'cover');
  // await Album.populate(user.albums, { path: 'photos', select: 'id' });
  await Promise.all(user.albums.map(album => album.populatePhotosCount()));

  const photos = await Photo.find().populate({ path: 'album', populate: { path: 'author' } });
  await Promise.all(photos.map(photo => photo.populateLikesCount()));

  ctx.render('index', { user, photos });
};
