const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('../../database');
const { getHash } = require('./password');

passport.use(new Strategy(
  {
    usernameField: 'email'
  },
  async (email, password, next) => {
    try {
      const user = await db('users').where({ email }).first();
      if (!user) return next(null, false);
      if (user.password !== getHash(password)) return next(null, false);
      return next(null, user);
    } catch (error) {
      return next(error);
    }
  }
));

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser(async (id, next) => {
  try {
    const user = await db('users').where({ id }).first();
    next(null, user);
  } catch (error) {
    next(error);
  }
});

module.exports = passport;
