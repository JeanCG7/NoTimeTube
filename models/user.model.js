const mongoose = require('mongoose');
const crypto = require('crypto');

let UserSchema = mongoose.Schema({
    name: String,
    emailAddress:{
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    } 
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex'); 
     
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
};

UserSchema.methods.validPassword = function(password) {
    var passwordHash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === passwordHash; 
}; 

const User = module.exports = mongoose.model('User', UserSchema);