const passport = require('passport');
const User = require('../models/user.model');


exports.login = (req, res, next) => {
  const {body: user} = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: 'Welcome!',
    failureFlash: 'Invalid username or password.',
  }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      user.token = user.generateJWT();

      res.cookie('currentUser', user.toAuthJSON(), {httpOnly: true})
          .cookie('token', user.token, {httpOnly: true})
          .redirect('/');
    }

    return res.status(400)
        .redirect('/login');
  })(req, res, next);
};

exports.current = (req, res) => {
  const {payload: {id}} = req;

  return User.findById(id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(400);
        }

        return res.json({user: user.toAuthJSON()});
      });
};

exports.logout = (req, res) => {
  req.logout();
  res.clearCookie('token')
      .clearCookie('currentUser')
      .status(200)
      .redirect('/');
};
