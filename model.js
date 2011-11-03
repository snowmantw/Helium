
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Comment == Post
// Summary == Post -content
exports.Post = new Schema({
	id : String,	//*NOT* DB generated id.
	title : String,
	content : String,
	author : String,
	date : Number,
	comments : [exports.Post]
});	

exports.Line = new Schema({
	id : String,   //*NOT* DB generated id.
	type : String, //Enumeration schema date type exist ? 
	name : String,
	content : String,
	date : Number
});

