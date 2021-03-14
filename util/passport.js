const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('../database');
const { getHash } = require('./password');

passport.use(new Strategy(
  {
    usernameField: 'email'
  },
  async (email, password, cb) => {
    try {
      const user = await db('users').where({ email }).first();
      if (!user) return cb(null, false);
      if (user.password !== getHash(password)) return cb(null, false);
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await db('users').where({ id }).first();
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});

module.exports = passport;