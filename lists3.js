var fs = require('fs');
var knox = require('knox');

var aws = require('./aws.js');

exports.client = function(bucket){
	if(null == bucket) { throw new Error("NULL bucket."); }

	var clt = knox.createClient({
				key: aws.key
			  , secret: aws.secret
			  , bucket: bucket
			});
	return clt;
}


