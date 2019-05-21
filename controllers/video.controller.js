const Video = require('../models/video.model');

exports.upload = (req, res) => {
    const video = new Video();
    video.upload();
};