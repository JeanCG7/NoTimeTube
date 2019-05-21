const uploader = require('../utils/uploader');

const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const videoController = require('../controllers/video.controller');

router.get('/', auth.optional, videoController.videos);

router.get('/videos/upload', auth.optional, function(req, res) {
  res.render('videos/upload-videos');
});

router.post('/videos/upload', auth.required, uploader().single('file'), videoController.save);

router.get('/videos/search', auth.optional, videoController.search);

router.get('/watch', auth.optional, videoController.detail);

module.exports = router;
