const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tableSchema =  new Schema({

    tableIdentifier: {
		type: String,
		required: true
	},
	capacity: {
		type: Number,
		required: true
	},
	status: {
		type: String,
	},
});
const Table = mongoose.model("table", tableSchema);

module.exports = {Table}