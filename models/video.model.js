
const mongoose = require('mongoose');
const User = require('../models/user.model');
const GFS = mongoose.model('GFS', new mongoose.Schema({}, { strict: false }), 'fs.files');

const VideoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    uploadUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    file: {
        type: mongoose.Schema.Types.Object, 
        ref: 'GFS'
      }
});



VideoSchema.methods.upload = function() {
  console.log('aqui');
    upload.single('file'), (req, res) => {
            res.json({ file: req.file });
    }
}

module.exports = mongoose.model('Video', VideoSchema);
