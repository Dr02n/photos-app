const Router = require('koa-router')
const passport = require('koa-passport')
const multer = require('koa-multer')
const resetPasswordController = require('./controllers/auth/password/reset')
const loginController = require('./controllers/auth/login')
const usersController = require('./controllers/users')
const albumsController = require('./controllers/albums')
const photosController = require('./controllers/photos')
const findById = require('./middleware/findById')

const pug = require('pug')

const router = new Router()
const api = new Router()
const auth = new Router()
const users = new Router()
const albums = new Router()
const photos = new Router()

const jwtAuth = passport.authenticate('jwt', { session: false })
const localAuth = passport.authenticate('local', { session: false })
const githubAuth = passport.authenticate('github', { session: false })

const upload = multer({ dest: 'uploads/', preservePath: true })

auth.post('/signup', require('./controllers/auth/signup'))
auth.post('/login', localAuth, loginController.local)
auth.post('/password/forgot', require('./controllers/auth/password/forgot'))

users.use(jwtAuth)
users.param('user', findById('User'))
users.get('/:user', usersController.get)
users.patch('/:user', usersController.patch)
users.get('/:user/albums', albumsController.getByAuthor)

albums.use(jwtAuth)
albums.param('album', findById('Album'))
albums.post('/', albumsController.post)
albums.get('/:album', albumsController.get)
albums.patch('/:album', albumsController.patch)
albums.delete('/:album', albumsController.delete)
albums.post('/:album/photos', upload.array('photos', 12), photosController.post)

photos.use(jwtAuth)
photos.param('photo', findById('Photo'))
photos.patch('/:photo', photosController.patch)
photos.delete('/:photo',  photosController.delete)

// router.put('/photos/:photo/comments', require('./controllers/comments').put)
// router.get('/photos/:photo/like', require('./controllers/likes').put)
// router.get('/search', () => null)

api.use('/auth', auth.routes(), auth.allowedMethods())
api.use('/users', users.routes(), users.allowedMethods())
api.use('/albums', albums.routes(), albums.allowedMethods())
api.use('/photos', photos.routes(), photos.allowedMethods())

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
