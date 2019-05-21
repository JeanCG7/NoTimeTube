const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');

/* GET home page. */
// router.get('/', auth.optional, function(req, res, next) {
//   res.render('index', {title: 'Express'});
// });

module.exports = router;
