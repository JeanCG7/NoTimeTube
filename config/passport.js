const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;

const User = require('../models/user.model');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({email: email})
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {errors: {'email or password': 'is invalid'}});
        }

        return done(null, user, {message: 'Logged In Successfully'});
      }).catch(done);
}));

passport.use(new JWTStrategy({
  jwtFromRequest: (req) => req.cookies.token,
  secretOrKey: process.env.SECRET,
}, (jwtPayload, done) => {
  if (Date.now() > jwtPayload.exp) {
    return done('jwt expired', false);
  }

  return done(null, jwtPayload);
}
));
