const User = require('../models/user.model');

exports.register = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  user.setPassword(req.body.password);
  user.save((err) => {
    if (err) {
      return err;
    }
    console.log('User created successfully');
  });
};

exports.users = (req, res) => {
  return User.find()
      .then((users) => {
        if (!users) {
          return res.sendStatus(400);
        }

        return res.json({users: users});
      });
};

exports.delete = (req, res) => {
  return User.deleteMany()
      .then((user) => {
        return res.json({user: user});
      });
};
