var ejs = require('ejs');			//Template engine
var cradle = require('cradle');		//CouchDB Driver
var express = require('express');

var dbconnect = new (cradle.Connection)('140.119.164.163',5984,
{cache:true,raw:false});
var db = dbconnect.database('CAD2011');

var app = express.createServer(express.logger());
app.configure(function()
{
	app.set('views', __dirname + '/template');
	app.set("view options",{layout:false});
	app.use(express.bodyParser());
});

app.get('/',function(req,res){
	res.render('chatroom.ejs');
});

app.post('/postMessage',function(req,res)
{
	console.log(req.param('message'));
});

var port = process.env.PORT || 3000
app.listen(port,function(){
	console.log("Listen on " + port);
});
