var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/user.controller');
/* GET users listing. */

router.post('/create', (req, res) => { 
    user_controller.create
});

module.exports = router;
