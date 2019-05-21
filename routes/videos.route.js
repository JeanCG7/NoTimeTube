const Uploader = require('../utils/uploader');

const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const videoController = require('../controllers/video.controller');

router.get('/', auth.required, function(req, res) {
  res.render('videos/list-videos');
});

router.get('/upload', function(req, res) {
  res.render('videos/upload-videos');
});

router.post('/upload', Uploader().single('file'), videoController.save);

router.get('/search', function(req, res) {
  res.render('videos/search-videos');
});

router.get('/detail', function(req, res) {
  res.render('videos/detail-videos');
});

module.exports = router;