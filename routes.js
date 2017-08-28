const Router = require('koa-router');
const resetPassword = require('./routes/reset-password');
const albums = require('./routes/albums');
const photos = require('./routes/photos');
const users = require('./routes/users');
const { publicRoute, privateRoute } = require('./middleware/public-private');

const router = new Router();

router.param('resetPasswordToken', resetPassword.checkStatus);
router.param('album', albums.loadAlbumByid);
router.param('photo', photos.loadPhotoById);
router.param('user', users.loadUserById);

router.get('/signup', require('./routes/signup').get);
router.post('/signup', require('./routes/signup').post);
router.get('/login', publicRoute, require('./routes/login').get);
router.post('/login', require('./routes/login').post);
router.get('/logout', require('./routes/logout').get);

router.get('/forgot-password', require('./routes/forgot-password').get);
router.post('/forgot-password', require('./routes/forgot-password').post);
router.get('/reset-password/:resetPasswordToken', resetPassword.get);
router.post('/reset-password/:resetPasswordToken', resetPassword.post);

router.get('/auth/github', require('./routes/auth-github').get);
router.get('/auth/github/callback', require('./routes/auth-github').callback);

router.get('/', privateRoute, require('./routes/index').get);

router.get('/users/:user', users.get);
router.patch('/users/:user', photos.filterImages, users.patch);

router.put('/albums', photos.filterImages, albums.put);
router.get('/albums/:album', albums.get);
router.patch('/albums/:album', photos.filterImages, albums.patch);
router.delete('/albums/:album', albums.delete);

router.put('/albums/:album/photos', photos.filterImages, photos.put);
router.patch('/photos/:photo', photos.patch);
router.delete('/photos/:photo', photos.delete);

router.put('/photos/:photo/comments', () => null);
router.put('/photos/:photo/likes', () => null);
router.get('/search', () => null);

module.exports = router.routes();
