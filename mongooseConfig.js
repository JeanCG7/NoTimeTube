const mongoose = require('mongoose');
let dev_db_url = 'mongodb://<>:<>@ds149806.mlab.com:49806/notimetube';

let mongoDB = process.env.mongoDB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = { mongoose };