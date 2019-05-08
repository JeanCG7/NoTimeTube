var express = require('express');
var router = express.Router();

const User = require('../models/user.model');
const userController = require('../controllers/user.controller');
/* GET users listing. */

router.post('/register', userController.register);

router.get('/register', function (req, res) {
    res.render('auth/register');
});

router.get('/login', function (req, res) {
    res.render('auth/login');
});


module.exports = router;
