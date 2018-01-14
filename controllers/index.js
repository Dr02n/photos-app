const Photo = require('../models/Photo')


exports.get = async (ctx, next) => {
  const { user } = ctx.state

  // await user.populate({ path: 'albums', populate: { path: 'cover' } }).execPopulate()
  // await Promise.all(user.albums.map(album => album.populatePhotosCount()))

  const photos = await Photo.find()
    .populate({ path: 'album' })
    .populate({ path: 'author' })
    .populate({ path: 'comments', populate: { path: 'author' } }) // temp

  await Promise.all(photos.map(photo => photo.populateLikesCount()))

  photos.forEach(photo => {
    photo.isLiked = photo.isLiked(user)
  })

  ctx.render('index', {
    // user,
    photos,
    title: 'Latest photos'
  })
}
