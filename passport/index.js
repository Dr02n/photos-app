const passport = require('koa-passport');
const User = require('../models/User');

passport.use(User.createStrategy());
passport.use(require('./github-strategy'));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
