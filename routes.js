const Router = require('koa-router')
const passport = require('koa-passport')
const resetPassword = require('./controllers/auth/reset-password')
const pug = require('pug')
// const albums = require('./controllers/albums')
// const photos = require('./controllers/photos')
// const users = require('./controllers/users')

const router = new Router()
const api = new Router()

// const jwtAuth = passport.authenticate('jwt', { session: false })
const localAuth = passport.authenticate('local', { session: false })
const githubAuth = passport.authenticate('github', { session: false })

api.post('/auth/signup', require('./controllers/auth/signup'))
api.post('/auth/login', localAuth, require('./controllers/auth/login'))
api.post('/auth/password/forgot', require('./controllers/auth/forgot-password'))

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

// router.param('resetPasswordToken', resetPassword.checkStatus)
// router.param('album', albums.loadAlbumByid)
// router.param('photo', photos.loadPhotoById)
// router.param('user', users.loadUserById)

router.use('/api', api.routes(), api.allowedMethods())

router.post(
  'reset-password',
  '/auth/password/reset/:resetPasswordToken',
  resetPassword.checkStatus,
  resetPassword.reset
)

router.get('/auth/github', githubAuth)
router.get(process.env.GITHUB_CALLBACK_URL, githubAuth, require('./controllers/auth/github'))

router.get('/github-auth-test', (ctx) => {
  ctx.body = pug.renderFile('templates/github-auth-test.pug')
})

module.exports = router
