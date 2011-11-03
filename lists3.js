var fs = require('fs');
var knox = require('knox');
var parser = require('xml2json');

var aws = require('./aws.js');

exports.client = knox.createClient({
    key: aws.key
  , secret: aws.secret
  , bucket: aws.s3bucket.task05
});


