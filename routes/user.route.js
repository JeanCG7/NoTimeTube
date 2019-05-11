var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/user.controller');
/* GET users listing. */

router.get('/', user_controller.users);

router.get('/delete', user_controller.delete);

router.post('/create', (req, res) => {
    user_controller.create
});

module.exports = router;