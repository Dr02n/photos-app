const Router = require('koa-router')
const passport = require('koa-passport')

const resetPassword = require('./controllers/auth/reset-password')
// const albums = require('./controllers/albums')
// const photos = require('./controllers/photos')
// const users = require('./controllers/users')

// const { publicRoute, privateRoute } = require('./middleware/public-private')

const router = new Router({
  prefix: '/api'
})

// const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.param('resetPasswordToken', resetPassword.checkStatus)
// router.param('album', albums.loadAlbumByid)
// router.param('photo', photos.loadPhotoById)
// router.param('user', users.loadUserById)

router.post('/auth/signup', require('./controllers/auth/signup'))
router.post('/auth/login', requireSignin, require('./controllers/auth/login'))

router.get('/auth/github', require('./controllers/auth/github').get)
router.get('/auth/github/callback', require('./controllers/auth/github').callback)

// router.post('/forgot-password', require('./controllers/auth/forgot-password').post)
// router.post('/reset-password/:resetPasswordToken', resetPassword.post)

// router.get('/users/:user', users.get)
// router.patch('/users/:user', photos.filterImages, users.patch)

// router.put('/albums', photos.filterImages, albums.put)
// router.get('/albums/:album', albums.get)
// router.patch('/albums/:album', photos.filterImages, albums.patch)
// router.delete('/albums/:album', albums.delete)

// router.put('/albums/:album/photos', photos.filterImages, photos.put)
// router.patch('/photos/:photo', photos.patch)
// router.delete('/photos/:photo', photos.delete)

// router.put('/photos/:photo/comments', require('./controllers/comments').put)
// router.get('/photos/:photo/like', require('./controllers/likes').put)
// router.get('/search', () => null)

module.exports = router
