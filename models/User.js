var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
    organisation: { type: String, required: true },
    admin: { type: Boolean, required: true },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};

// assign schema to User model
mongoose.model('User', userSchema);