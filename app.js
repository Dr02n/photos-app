const Koa = require('koa');
require('dotenv').config();
require('./mongoose');
const passport = require('./passport');

const app = new Koa();

app.keys = ['some secret hurr'];

// configure pug
const pug = new (require('koa-pug'))({ // eslint-disable-line
  viewPath: './templates',
  basedir: './templates',
  noCache: process.env.NODE_ENV === 'development',
  helperPath: [
    { moment: require('moment') }
  ],
  app
});

// midleware
app.use(require('koa-favicon')('public/favicon.ico'));
app.use(require('koa-static')('public'));
app.use(require('koa-logger')());
app.use(require('./middleware/errors'));
app.use(require('koa-bodyparser')());
// require('./middleware/multipart-parser').init(app);
app.use(require('./middleware/multipart'));
app.use(require('koa-session')(app));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middleware/flash'));
app.use(new (require('koa-csrf'))());
app.use(require('./middleware/method-override'));

app.use(async (ctx, next) => {
  ctx.state.csrf = ctx.csrf;
  await next();
});

// routes
app.use(require('./routes'));

app.listen(3000);


// dev
(async () => {
  // try {
  //   await User.create({});
  // } catch (err) {
  //   console.log(err);
  // }
  // await User.remove({});
  // console.log(await User.find());
  // const user = await User.findOne({email: 'test@ma.com'});
  // console.log(user);
})();
