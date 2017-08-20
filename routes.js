const Router = require('koa-router');
const resetPassword = require('./routes/reset-password');

const router = new Router();

router.get('/', (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.render('index');
  } else {
    ctx.redirect('/login');
  }
});

router.get('/signup', require('./routes/signup').get);
router.post('/signup', require('./routes/signup').post);
router.get('/login', require('./routes/login').get);
router.post('/login', require('./routes/login').post);
router.get('/logout', require('./routes/logout').get);

router.get('/forgot-password', require('./routes/forgot-password').get);
router.post('/forgot-password', require('./routes/forgot-password').post); // eslint-disable-line
router.get('/reset-password/:token', resetPassword.checkStatus, resetPassword.get);
router.post('/reset-password/:token', resetPassword.checkStatus, resetPassword.post);

router.get('/auth/github', require('./routes/auth-github').get);
router.get('/auth/github/callback', require('./routes/auth-github').callbackGet);

module.exports = router.routes();
