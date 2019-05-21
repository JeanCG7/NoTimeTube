
const mongoose = require('mongoose');
const User = require('../models/user.model');
const GFS = mongoose.model('GFS', new mongoose.Schema({}, {strict: false}), 'fs.files');

const VideoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  uploadUser: {
    type: mongoose.Schema.Types.Object,
    ref: 'Users',
  },
  file: {
    type: mongoose.Schema.Types.Object,
    ref: 'GFS',
  },
});

module.exports = mongoose.model('Video', VideoSchema);
