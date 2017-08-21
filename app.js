const Koa = require('koa');
require('dotenv').config();

const app = new Koa();

// Error.stackTraceLimit = 100;
// require('trace');
// require('clarify'); // remove nodecore related stack trace noise

app.keys = [process.env.APP_KEY];


// configure mongoose
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.Promise = Promise;
mongoose.plugin(beautifyUnique);
mongoose.set('debug', process.env.NODE_ENV === 'development');

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(() => null, err => console.error(err.message));


// configure passport
const passport = require('koa-passport');
const User = require('./models/User');

passport.use(User.createStrategy());
passport.use(require('./passport/github-strategy'));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// configure pug
const Pug = require('koa-pug');

const pug = new Pug({ // eslint-disable-line
  viewPath: './templates',
  basedir: './templates',
  noCache: process.env.NODE_ENV === 'development',
  app
});

// midlewares
app.use(require('koa-favicon')('public/favicon.ico'));
app.use(require('koa-static')('public'));
app.use(require('koa-logger')());
app.use(require('./middleware/errors'));
app.use(require('koa-bodyparser')());
// multipart parser
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
