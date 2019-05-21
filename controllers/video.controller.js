const fs = require('fs');
const Video = require('../models/video.model');

exports.save = (req, res) => {
  const video = new Video({
    name: req.body.name,
    description: req.body.description,
    uploadDate: Date.now(),
    uploadUser: req.cookies.currentUser._id,
    file: req.file.id,
  });

  video.save((err) => {
    if (err) console.log(err);
    console.log('Video uploaded successfully');
  });
};

exports.videos = (req, res) => {
  Video.find()
      .then((videos) => {
        if (!videos || videos.length === 0) {
          res.render('videos/list-videos', {videos: false});
        }
        res.render('videos/list-videos', {videos: videos});
      });
};

exports.detail = (req, res) => {
  Video.findOne({'_id': req.query.v}, (err, file) => {
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    fs.createReadStream({
      id: file._id,
    }).pipe(res);
  });
};

exports.search = (req, res) => {
  const search = req.query.search;
  Video.find({'name': {$regex: search}})
      .then((videos) => {
        if (!videos || videos.length === 0) {
          res.render('videos/search-videos', {videos: false});
        }
        res.render('videos/search-videos', {videos: videos});
      });
};
