var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/user.controller');
/* GET users listing. */

router.post('/register', user_controller.create);

router.get('/register', function (req, res) {
    res.render('auth/register');
});

router.get('/login', function (req, res) {
    res.render('auth/login');
});


module.exports = router;
