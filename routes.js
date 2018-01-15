const Router = require('koa-router')
const passport = require('koa-passport')
const pug = require('pug')
const resetPasswordController = require('./controllers/auth/password/reset')
const loginController = require('./controllers/auth/login')
const usersController = require('./controllers/users')
const albumsController = require('./controllers/albums')
// const photos = require('./controllers/photos')

const router = new Router()
const api = new Router()
const auth = new Router()
const users = new Router()
const albums = new Router()

const jwtAuth = passport.authenticate('jwt', { session: false })
const localAuth = passport.authenticate('local', { session: false })
const githubAuth = passport.authenticate('github', { session: false })

auth.post('/signup', require('./controllers/auth/signup'))
auth.post('/login', localAuth, loginController.local)
auth.post('/password/forgot', require('./controllers/auth/password/forgot'))

users.use(jwtAuth)
users.param('user', usersController.findById)
users.get('/:user', usersController.get)
users.patch('/:user', usersController.patch)
users.get('/:user/albums', albumsController.getByAuthor)

albums.use(jwtAuth)
albums.param('album', albumsController.findById)
albums.post('/', albumsController.post)
albums.get('/:album', albumsController.get)
albums.patch('/:album', albumsController.patch)
albums.delete('/:album', albumsController.delete)

// router.param('photo', photos.loadPhotoById)
// router.put('/albums/:album/photos', photos.filterImages, photos.put)
// router.patch('/photos/:photo', photos.patch)
// router.delete('/photos/:photo', photos.delete)

// router.put('/photos/:photo/comments', require('./controllers/comments').put)
// router.get('/photos/:photo/like', require('./controllers/likes').put)
// router.get('/search', () => null)

api.use('/auth', auth.routes(), auth.allowedMethods())
api.use('/users', users.routes(), users.allowedMethods())
api.use('/albums', albums.routes(), albums.allowedMethods())

router.use('/api', api.routes(), api.allowedMethods())

router.post(
  'reset-password',
  '/auth/password/reset/:resetPasswordToken',
  resetPasswordController.checkStatus,
  resetPasswordController.reset
)

router.get('/auth/github', githubAuth)
router.get(process.env.GITHUB_CALLBACK_URL, githubAuth, loginController.oauth)

router.get('/github-auth-test', (ctx) => {
  ctx.body = pug.renderFile('templates/github-auth-test.pug')
})

module.exports = router
