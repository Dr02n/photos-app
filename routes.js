const Router = require('koa-router')
const passport = require('koa-passport')
const multer = require('koa-multer')
const resetPasswordController = require('./controllers/auth/password/reset')
const loginController = require('./controllers/auth/login')
const usersController = require('./controllers/users')
const albumsController = require('./controllers/albums')
const photosController = require('./controllers/photos')
const findById = require('./middleware/findById')
const fileFilter = require('./utils/imageFileFilter')
const pug = require('pug')

const router = new Router()
const api = new Router()
const auth = new Router()
const users = new Router()
const albums = new Router()
const photos = new Router()

const authenticate = (type) => passport.authenticate(type, { session: false })

const upload = multer({ dest: 'public/uploads/', fileFilter })

auth
  .post('/signup', require('./controllers/auth/signup'))
  .post('/login', authenticate('local'), loginController.local)
  .post('/password/forgot', require('./controllers/auth/password/forgot'))

users
  .use(authenticate('jwt'))
  .param('user', findById('User'))
  .get('/:user', usersController.get)
  .patch('/:user', usersController.patch)
  .get('/:user/albums', albumsController.getByAuthor)

albums
  .use(authenticate('jwt'))
  .param('album', findById('Album'))
  .post('/', albumsController.post)
  .get('/:album', albumsController.get)
  .patch('/:album', albumsController.patch)
  .delete('/:album', albumsController.delete)
  .post('/:album/photos', upload.single('photo'), photosController.post)
  .get('/:album/photos', photosController.getByAlbum)

photos
  .use(authenticate('jwt'))
  .param('photo', findById('Photo'))
  .patch('/:photo', photosController.patch)
  .delete('/:photo', photosController.delete)

api
  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/users', users.routes(), users.allowedMethods())
  .use('/albums', albums.routes(), albums.allowedMethods())
  .use('/photos', photos.routes(), photos.allowedMethods())

router
  .use('/api', api.routes(), api.allowedMethods())
  .post('reset-password', '/auth/password/reset/:resetPasswordToken', resetPasswordController.checkStatus, resetPasswordController.reset)
  .get('/auth/github', authenticate('github'))
  .get(process.env.GITHUB_CALLBACK_URL, authenticate('github'), loginController.oauth)
  .get('/github-auth-test', (ctx) => {
    ctx.body = pug.renderFile('templates/github-auth-test.pug')
  })

module.exports = router
