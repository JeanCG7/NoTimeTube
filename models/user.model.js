const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 15}
});

module.exports = mongoose.model('User', UserSchema);