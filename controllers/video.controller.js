const Video = require('../models/video.model');

exports.save = (req, res) => {
    const video = new Video({
        name: req.body.name,
        description: req.body.description,
        uploadDate: Date.now(),
        uploadUser: req.cookies.currentUser._id,
        file: req.file.id
    });

    video.save((err) => {
        if(err)
            console.log(err);
        console.log('Video uploaded successfully');
    });
};