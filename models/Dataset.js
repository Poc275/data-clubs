var mongoose = require('mongoose');

var datasetSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
    tags: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String },
    url: { type: String, required: true },
    sponsored: { type: Boolean, required: true }
});

// assign schema to model
mongoose.model('Dataset', datasetSchema);