var express = require('express');
var router = express.Router();

const auth = require('../utils/auth');

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
/* GET users listing. */

router.post('/register', auth.optional, userController.register);

router.get('/register', auth.optional, function(req, res) {
    res.render('auth/register');
});

router.get('/login', auth.optional, function(req, res) {
    res.render('auth/login');
});

router.post('/login', auth.optional, authController.login);

router.get('/current', auth.optional, authController.current);

module.exports = router;