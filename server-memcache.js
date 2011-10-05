var ejs = require('ejs');			//Template engine
var cradle = require('cradle');		//CouchDB Driver
var express = require('express');
var uuid = require('node-uuid');
var fs = require('fs');
var Mcache = require('memcached');
var cache = new Mcache(['server-1:11211', 'server-2:11211']);

var dbconnect = new (cradle.Connection)('140.119.164.163',5984,
{cache:true,raw:false});
var db = dbconnect.database('cad2011');

db.exists(function(err,exists)
{
	console.log(exists);

	console.log("Test if db exists.");
	if(err)
	{
		console.log(err);
	}
	else if(! exists)
	{
		console.log("Database don't exists.");
		db.create();
		console.log("Creating it done.");
	}
	else
	{
		console.log("Database is OK.");
	}
});


cache.connect( '140.119.164.163:11212', function( err, conn ){
    if( err ) throw new Error( err );
    console.log("[MEMCACHE OK!! CONNECT]" + conn.server );
});

cache.set("hello", 1, 10000, function( err, result ){
	if( err ) 
	{
		console.log("[MEMCACHE FAILED!! SET]");
	}

	console.log("[MEMCACHE OK!! SET]");
	console.log( result );
	cache.end(); // as we are 100% certain we are not going to use the connection again, we are going to end it
});

cache.get( "hello", function( err, result ){
	if( err )
	{
		console.log("[MEMCACHE FAILED!! GET]");
	}

	console.log("[MEMCACHE OK!! GET]");
	console.log( result );
	cache.end(); // as we are 100% certain we are not going to use the connection again, we are going to end it
});

var app = express.createServer(express.logger());
app.configure(function()
{
	app.set('views', __dirname + '/template');
	app.set("view options",{layout:false});
	app.use(express.bodyParser());
	app.use('/public',express.static(__dirname + '/public'));
});

app.get('/',function(req,res){
	res.render('chatroom.ejs');
});

app.get('/fetchAll',function(req,res){
	db.all(function(err,arrinfo){
		var arrmsg = [];

		for(var itr in arrinfo)
		{
			console.log(arrinfo[itr].id);
			db.get(arrinfo[itr].id,function(err,json_data)
			{
				var doc = JSON.parse(json_data);

				arrmsg.push({'name' : doc.name , 'message' : doc.message});

				//Each async handler must judge if it's last one and do the "join" work.
				if(arrinfo[arrinfo.length - 1].id == doc._id)
				{
					res.send(JSON.stringify(arrmsg));

				}	
			});
		}
	});
});

app.get('/fetch',function(req,res)
{
	db.get(req.param('id'),function(err,json_data)
	{
		var doc = JSON.parse(json_data);
		res.send(JSON.stringify({'name':doc.name,'message':doc.message}));
	});
});

app.post('/postMessage',function(req,res)
{
	var id = uuid();
	db.save(id,{'name':req.body.name,'message':req.body.message});
	res.send(JSON.stringify({'id':id}));
});

var port = process.env.PORT || 3000
app.listen(port,function(){
	console.log("Listen on " + port);
});

