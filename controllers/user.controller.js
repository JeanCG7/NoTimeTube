const User = require('../models/user.model');

exports.register = (req, res) => {
    let user = new User({
        name: req.body.name,
        emailAddress:  req.body.emailAddress
    });

    user.setPassword(req.body.password);
    user.save((err) => {
        if(err) 
            return err;
        console.log('User created successfully')
    });
}