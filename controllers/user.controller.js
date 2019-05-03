const User = require('../models/user.model');

exports.create = (req, res) => {
    let user = new User({
        email: req.body.email,
        password:  req.body.price
    });

    user.save((err) => {
        if(err) 
            return err;
        res.send('User Created successfully');
    });
}