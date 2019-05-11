var express = require('express');
var router = express.Router();

const auth = require('../utils/auth');

/* GET home page. */
router.get('/', auth.optional, function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;