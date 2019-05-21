const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
/* GET users listing. */

router.get('/', UserController.users);

router.get('/delete', UserController.delete);

router.post('/create', UserController.register);

module.exports = router;
