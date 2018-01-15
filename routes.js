const Router = require('koa-router')
const passport = require('koa-passport')
const resetPassword = require('./controllers/auth/password/reset')
const login = require('./controllers/auth/login')
const pug = require('pug')
const albumsController = require('./controllers/albums')
// const photos = require('./controllers/photos')
// const users = require('./controllers/users')

const router = new Router()
const api = new Router()
const auth = new Router()
const albums = new Router()

const jwtAuth = passport.authenticate('jwt', { session: false })
const localAuth = passport.authenticate('local', { session: false })
const githubAuth = passport.authenticate('github', { session: false })

auth.post('/signup', require('./controllers/auth/signup'))
auth.post('/login', localAuth, login.local)
auth.post('/password/forgot', require('./controllers/auth/password/forgot'))

// router.get('/users/:user', users.get)
// router.patch('/users/:user', photos.filterImages, users.patch)

albums.use(jwtAuth)
albums.param('album', albumsController.loadAlbumByid)
albums.post('/', albumsController.post)
albums.get('/:album', albumsController.get)
albums.patch('/:album', albumsController.patch)
albums.delete('/:album', albumsController.delete)

// router.put('/albums/:album/photos', photos.filterImages, photos.put)
// router.patch('/photos/:photo', photos.patch)
// router.delete('/photos/:photo', photos.delete)

// router.put('/photos/:photo/comments', require('./controllers/comments').put)
// router.get('/photos/:photo/like', require('./controllers/likes').put)
// router.get('/search', () => null)

// router.param('photo', photos.loadPhotoById)
// router.param('user', users.loadUserById)

api.use('/auth', auth.routes(), auth.allowedMethods())
api.use('/albums', albums.routes(), albums.allowedMethods())

router.use('/api', api.routes(), api.allowedMethods())

router.post(
  'reset-password',
  '/auth/password/reset/:resetPasswordToken',
  resetPassword.checkStatus,
  resetPassword.reset
)

router.get('/auth/github', githubAuth)
router.get(process.env.GITHUB_CALLBACK_URL, githubAuth, login.oauth)

router.get('/github-auth-test', (ctx) => {
  ctx.body = pug.renderFile('templates/github-auth-test.pug')
})

module.exports = router
