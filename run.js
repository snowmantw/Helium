var ejs = require('ejs');			//Template engine
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var parser = require('xml2json');
var form = require('./node_modules/connect-form/lib/connect-form.js');

var model = require('./model.js');
var enumeration = require('./enumeration.js');
var lists3 = require('./lists3.js');

MODELS = [];

DBURL  = "vanilla"
DBNAME = "helium";
DBPORT = "27017";
DBUSER = "helium";

function initializeDatabase()
{
	var URI = 'mongodb://'+DBUSER+'@'+DBURL+':'+DBPORT+'/'+DBNAME;

	mongoose.connect(URI);
	
	MODELS['Post'] = mongoose.model('Post',model.Post);
	MODELS['Line'] = mongoose.model('Line',model.Line);
}

function generatePostID(post)
{
	return String(post.date);
}

function generateCommentID(pid,comment)
{
	return pid+'_'+String(comment.date);
}

function generateLineID(line)
{
	return String(line.date);
}

function PostIDFromCommentID(cid)
{
	return (cid.match(/([0-9]+)_/))[1];
}


var app = express.createServer(express.logger());
app.configure(function()
{
	var cbuildir = __dirname + '/client';
	
	app.set('views', cbuildir + '/template');
	app.set("view options",{layout:false});
	app.use(express.bodyParser());
	app.use('/main',express.static( cbuildir + '/main'));
	app.use('/library',express.static( cbuildir + '/library'));
	app.use('/style',express.static( cbuildir + '/style'));
	app.use('/media',express.static( cbuildir + '/media'));
	app.use('/config',express.static( cbuildir + '/config'));
	app.use(form({keepExtensions: true}));
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('/',function(req,res){
	
	res.render('index.ejs');
});

app.get('/testSave',function(req,res){

	var post = (new MODELS['Post']);

	post.title = 'Title as testing';
	post.date = Number(Date.now());
	post.author = "Author";
	post.id = generatePostID(post);

	post.save();
	res.end("Done");
});

app.get('/testPostIDFromCommentID',function(req,res){
	res.end(PostIDFromCommentID(req.param('pid')));
});

app.get('/testRemoveInstance',function(req,res){

	MODELS['Post']
		.findOne({'id':'3'},function(err,doc){
		doc.remove();
		doc.save();

		res.end("Done");
	});
});

app.get('/testRemoveAll',function(req,res){
	
	MODELS['Post']
		.find({},function(err,docs){
			for(var itr in docs)
			{
				docs[itr].remove();
				docs[itr].save();
			}		
		})	
	MODELS['Line']
		.find({},function(err,docs){
			for(var itr in docs)
			{
				docs[itr].remove();
				docs[itr].save();
			}		
			res.end("Done");
		})	
});

app.get('/fetchPost',function(req,res){
	
	function handler_fetchDone(err,doc){
		if(err) { throw new "/fetchPost ERROR : "+err.toString()}

		res.end(JSON.stringify(doc));
	}

	var id = req.param('id');

	MODELS['Post']
		.findOne({'id':id},handler_fetchDone);
});

app.get('/fetchLineAll',function(req,res){

	(MODELS['Line'])
		.find({},function(err,lines){
			if(err) { throw new "/fetchLineAll ERROR : "+err.toString()}
			res.end(JSON.stringify(lines));
		});
});

app.get('/fetchUIShell',function(req,res){
	res.render('shell.ui.ejs');
});

app.get('/fetchUIRead',function(req,res){
	res.render('read.ui.ejs');
});

app.get('/fetchRecordAll',function(req,res){

	(MODELS['Post'])
		.find({},['id','comments'],function(err,pidcomments){
			if(err) { throw new "/fetchRecordAll ERROR : "+err.toString()}

			var records = [];
			for( var itr = 0 ; itr != pidcomments.length ; itr ++)
			{
				var pid = pidcomments[itr].id
				records.push({'id':pid,'type':enumeration.type.record.post});	

				var comments = pidcomments[itr].comments;

				//Get records for each comment.
				for( var citr = 0 ; citr != comments.length ; citr++ )
				{		
					records.push({'id':comments[citr].id
								 ,'type':enumeration.type.record.comment});
				}

			}

			//Collect records for Line and send it out.
			(MODELS['Line'])
				.find({},['id','type'],function(err,idtypes){

					for(var litr = 0 ; litr != idtypes.length ; litr ++)
					{
						records.push({'id':idtypes[litr].id
									,'type':idtypes[litr].type});
					}

					res.end(JSON.stringify(records));
				});
		});
});

app.get('/fetchSummary',function(req,res){
	
	function handler_fetchDone(err,doc){
		if(err) { throw new "/fetchSummary ERROR : "+err.toString()}

		res.end(JSON.stringify(doc));
	}

	var id = req.param('id');

	MODELS['Post']
		.findOne({'id':id},{'id':1,'title':1,'author':1,'date':1},handler_fetchDone);
});

app.get('/fetchComments',function(req,res){
	

	// `doc` is {'_id' : (...) , 'comments' : [(...)]}
	function handler_fetchDone(err,doc){
		if(err) { throw new "/fetchSummary ERROR : "+err.toString()}
		
		res.end(JSON.stringify(doc.comments));
	}

	var id_post = String(req.param('id'));

	MODELS['Post']
		.findOne({'id':id_post},'comments',handler_fetchDone);
});

app.del('/deletePost',function(req,res){

	MODELS['Post']
		.findOne({'id':req.body.id},function(err,doc){
			if(err) { throw new "/deletePost ERROR : "+err.toString()}

			if(null != doc)
			{
				doc.remove();
				doc.save();
			}

			res.end(JSON.stringify({'id':req.body.id}));
		});
});

app.del('/deleteComment',function(req,res){

	MODELS['Post']
		.findOne({'id':PostIDFromCommentID(req.body.id)},
				 {'id':1,'comments':1},function(err,doc){

				if(err) { throw new "/deleteComment ERROR : "+err.toString()}

				var cid = req.body.id;

				if(null != doc) { 

					for(var citr = 0 ; citr != doc.comments.length ; citr++)
					{
						if(cid == comments[citr].id)
						{
							doc.remove();
							doc.save();
							
							break;
						}
					}
				}

			res.end(JSON.stringify({'id':cid}));
		});
});

app.post('/savePost',function(req,res){
	
	var post = new MODELS['Post']();
	post.title = req.body.title;
	post.content = req.body.content;
	post.author = req.body.author;
	post.date = Number(req.body.date);
	post.id = generatePostID(post);

	//Use post as a line.
	var line = new MODELS['Line']();

	//TODO:TRICKY
	line.name = '/post';
	line.type = '__type_line_instruction';
	line.content = '[ '+post.title+' ]';
	line.date = Number(post.date);
	line.id = post.id;

	line.save();
	post.save();
	res.end(JSON.stringify({'id':post.id}));
});

app.post('/saveComment',function(req,res){

	var pid = req.body.id;

	MODELS['Post'].findOne({'id':pid},function(err,post){
		if(err) { throw new "/saveComment ERROR : "+err.toString()}

		if(null != post)
		{
			// Only save comments' part. May cause problem ?
			var comment = new MODELS['Post']();
			comment.content = req.body.comment.content;
			comment.author = req.body.comment.author;
			comment.date = Number(req.body.comment.date);
			comment.id = generateCommentID(pid,comment);

			//TODO:Tricky: Comment has NO Title BUT must show it.
			comment.title = 'RE:[ '+post.title+' ]';	

			post.comments.push(comment);


			//Use comment as a line.
			var line = new MODELS['Line']();

			//TODO:TRICKY
			line.name = '/comment';
			line.type = '__type_line_instruction';
			line.content = '[ '+comment.title+' ]';
			line.date = Number(comment.date);
			line.id = comment.id;

			line.save();
			post.save();

			res.end(JSON.stringify({'id':comment.id}));
		}
		else
		{
			res.end(JSON.stringify({'id':null}));
		}
	});

});

app.post('/saveLine',function(req,res){
	
	var line = new MODELS['Line']();
	line.name = req.body.line.name;
	line.type = req.body.line.type;
	line.content = req.body.line.content;
	line.date = Number(req.body.line.date);
	line.id = generateLineID(line);

	line.save();
	res.end(JSON.stringify({'id':line.id}));

});

app.get('/fetchListFile',function(req,res){
	var default_bucket = 'cad2011task05';

	lists3.client(default_bucket).get('/').on('response', function(fres){
		if('200' == fres.statusCode)
		{
			fres.setEncoding('utf8');
			fres.on('data', function(xml){
				var finfos = (JSON.parse((parser.toJson(xml)))
								.ListBucketResult
								.Contents);
				var fnames = [];
				for(var itr = 0 ; itr != finfos.length ; itr++)
				{
					var finfo = finfos[itr];
					fnames.push(finfo.Key);
				}
				res.end(JSON.stringify({'fnames':fnames}));
			});
		}
	}).end();

});

app.get('/fetchListFileBucket',function(req,res){

	lists3.client(req.param('bucket')).get('/').on('response', function(fres){
		if('200' == fres.statusCode)
		{
			fres.setEncoding('utf8');
			fres.on('data', function(xml){
				var finfos = (JSON.parse((parser.toJson(xml)))
								.ListBucketResult
								.Contents);
				var fnames = [];
				for(var itr = 0 ; itr != finfos.length ; itr++)
				{
					var finfo = finfos[itr];
					fnames.push(finfo.Key);
				}
				res.end(JSON.stringify({'bucket':req.param('bucket')
						,'fnames':fnames}));
			});
		}
	}).end();

});

app.get('/fetchListBucket',function(req,res){

	//TODO: CHEATING
	res.end(JSON.stringify(['cad2011task05']));
});


app.post('/uploadFile',function(req,res){

	if(undefined == req.form)
	{ res.end("No upload form component!"); }

	req.form.complete(function(err, fields, files){
		if (err) {
		  next(err);
		} else {
			//No need to do anything more to get val.
			var bucket = fields.bucket;	
			var name = files.file.filename;
			var tmp_path = files.file.path;

			var client = lists3.client(bucket);

			fs.readFile(tmp_path, function(err, buf){
				if(err) { throw new Error(err);}

			  var freq = client.put('/'+name, {
				  'Content-Length': buf.length
				, 'Content-Type': 'application/octet-stream'
			  });
			  freq.on('response', function(fres){
				if (200 == fres.statusCode) {
				  console.log('saved to %s', fres.url);
				}
			  });
			  freq.end(buf);
				
			  res.redirect('/');
			});
		}
	  });
})



initializeDatabase();
var port = process.env.PORT || 3000
app.listen(port,function(){
	console.log("Listen on " + port);
});



