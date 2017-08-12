var mongoose = require('mongoose');

var clubSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
    tags: { type: String },
    open: { type: Boolean, required: true },
    owner: { type: String, required: true },
    members: { type: Array }
});

// assign schema to User model
mongoose.model('Club', clubSchema);