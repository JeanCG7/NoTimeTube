var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('videos/list-videos');
  });

router.get('/upload', function(req, res) {
  res.render('videos/upload-videos');
});

router.get('/search', function(req, res) {
    res.render('videos/search-videos');
});

router.get('/detail', function(req, res) {
    res.render('videos/detail-videos');
});

module.exports = router;
