const passport = require('passport');
const User = require('../models/user.model');


exports.login = (req, res, next) => {
    const { body: user } = req;

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
        session: false,
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: 'Welcome!',
        failureFlash: 'Invalid username or password.'
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.sendStatus(400);
    })(req, res, next);
};

exports.current = (req, res) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
};