var ejs = require('ejs');			//Template engine
var cradle = require('cradle');		//CouchDB Driver
var express = require('express');
var uuid = require('node-uuid');
var fs = require('fs');

//TODO: Bad. Should be a env variable.
//TODO: Bad AGAIN : No httpS supported in cradle...?
var DBURL = 'https://app1355379.heroku.cloudant.com';
var DBAUTH= {username:'app1355379.heroku',password:'VJ3hyQ0avK8SV8qiFf8dCcvw'};
var DBPORT= 443;

//var DBURL = '140.119.164.163';
//var DBPORT= 5984;

var dbconnect = new (cradle.Connection)(DBURL,DBPORT,
{cache:true,raw:false,auth:DBAUTH});

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
		if(err)
		{
			console.log(err);
			throw new Error();
		}

		if(0 == arrinfo.length)
		{
			res.send(JSON.stringify([]));
			return ;
		}
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
		try{
			var doc = JSON.parse(json_data);
		}catch(er)
		{
			console.log(er);
			throw new Error();
		}
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

