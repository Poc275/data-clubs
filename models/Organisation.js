var mongoose = require('mongoose');

var organisationSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	logoUrl: { type: String },
    type: { type: String, required: true },
    members: { type: Array }
});

// assign schema to model
mongoose.model('Organisation', organisationSchema);