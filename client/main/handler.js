
/*
 * Handler of (implicated) enter a new log instruction.
 *
 * @param String name
 * @param String content
 * @param Enum type : The line type.
 * @return None
 * @modify None
 * @effect Write a new line for this instruction .
 */
function handlerNewLine(name,content,type)
{
	var line = new Line(null,type,name,content
							,(new Date(Date.now()).getTime()));

	//Save, refetch and update all.
	async_saveLine(line,function(idobj){
		async_fetchLineAll(receiverLines);
	});
}

/*
 * Handler of `/comment` instruction.
 * 
 * @param String pid: Post's id.
 * @param String name: 'comment' instruction name.
 * @param String title: The comment's title.
 * @param String author: The comment's author.
 * @param String content: The comment's content .
 * @return None
 * @modify The database and view.
 * @effect Write a new comment of the post.
 *
 */
function handlerComment(name,author,content)
{
	if(null == name || null == author || null == content)
	{
		handlerNewLine("ERROR","Comment format error : correct : "
						+"(title,author,content)",enumeration.type.line.error);
		return;
	}

	var dom_post = jQuery('#'+config.id.post)
					.find('.'+config.styleclass.post.post)[0];

	var pid = extractPost(dom_post).id;

	var comment = new Comment(null,content,author
					,(new Date(Date.now())).getTime() );

	//Use post as a line.
	comment.type = enumeration.type.line.log;

	async_saveComment(pid,comment,function(id){
		async_fetchComments(pid,receiverComments);
	});
}

/*
 * Handler of `/post` instruction.
 * 
 * @param String name: 'post' instruction name.
 * @param String title: The post's title.
 * @param String author: The post's author.
 * @param String content: The post's content .
 * @return None
 * @modify The database and view.
 * @effect Write a new post for this instruction .
 *
 */
function handlerPost(name,title,author,content)
{
	if(null == name ||null == title || null == author || null == content)
	{
		handlerNewLine("ERROR","Post format error : correct : "
						+"(title,author,content)",enumeration.type.line.error);
		return;
	}

	var post = new Post(null,title,content,author
					,(new Date(Date.now())).getTime() );

	//Use post as a line.
	post.type = enumeration.type.line.log;

	async_savePost(post,function(id){
		async_fetchLineAll(receiverLines);
	});
}

/*
 * Handler of `/log` instruction.
 * 
 * @param String name: 'log' instruction name.
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and show help text on view.
 *
 */
function handlerLog(name,content)
{
	handlerNewLine(name,content
						,enumeration.type.line.log);
}

/*
 * Handler of `/help` instruction.
 * 
 * @param String name: 'help' instruction name.
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and show help text on view.
 *
 */
function handlerHelp(params)
{
	handlerNewLine('/help',config.instruction.help.content
						,enumeration.type.line.instruction);
}

/*
 * Handler of `/version` instruction.
 * 
 * @param String name: 'version' instruction name.
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and show the version on view.
 *
 */
function handlerVersion(params)
{
	handlerNewLine('/version',config.instruction.version.content
						,enumeration.type.line.instruction);
}

/*
 * Handler of `/linenunber` instruction.
 * 
 * @param String name: 'linenumber' instruction name.
 * @param String mode: ON or OFF mode text defined in config.
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and show the version on view.
 *
 */
function handlerLineNumber(name,mode)
{
	//Do not use `showLineNumber` because `handlerNewLine` 
	//	will save and update lines.
	switch(mode)
	{
		case config.instruction.linenumber.on:
			setPromptRenderLineNumber();
			handlerNewLine('/linenumber',config.instruction.linenumber.on
								,enumeration.type.line.instruction);

		break;
		case config.instruction.linenumber.off:
			setPromptRenderNormal();
			handlerNewLine('/linenumber',config.instruction.linenumber.off
								,enumeration.type.line.instruction);
		
		break;
		default:
			handlerNewLine('/linenumber',config.instruction.linenumber.error
								,enumeration.type.line.error);
	}
}


/*
 * Handler of `/read` instruction.
 * 
 * @note If set read mode, field `__on` will be true.
 *		  And it's counter part's function will be false.
 * @param String name: 'read' instruction name.
 * @param String lid: The id (order) of the line.
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and change the view to read mode.
 *
 */
function handlerRead(name,lid)
{
	//Get the line object from line id.
	var line = extractLine(jQuery('#'+config.id.wall.line)
				.find('.'+config.styleclass.line.line).eq(lid)[0]);

	//If the line is NOT a POSSIBLE post , error.
	if(enumeration.type.line.instruction != line.type || line.name != '/post')
	{
		handlerNewLine('[ERROR]',config.instruction.read.error
							,enumeration.type.line.error);
		return;
	}

	//Get the id value from line.
	var pid = line.id

	var ins_line = new Line(null,enumeration.type.line.instruction
							,'/read',lid
							,(new Date(Date.now()).getTime()));

	//Saving but do not refresh the line wall due to UI changed.
	async_saveLine(ins_line,function(idobj){
		async_fetchUIRead(function(html){
			receiverUIRead(html);
			async_fetchPost(pid,function(post){
				receiverPost(post);
				async_fetchComments(pid,receiverComments);
			});

		});
	});
	jQuery('#'+config.id.command).find('.'+config.styleclass.command.content).empty();

	handlerShell.__on = false;
	handlerRead.__on = true;


	//Set all new log to the feedback line.
	var fnorig = handlerNewLine;

	handlerNewLine = function(name,content,type)
	{
		var dom_title = jQuery('#'+config.id.title).find('.'+config.styleclass.post.title)[0];
		var orig = jQuery(dom_title).text();

		jQuery(dom_title).text(name+' -- '+content).fadeOut(3000,function(){
			jQuery(dom_title).text(orig).show();
		});
		
	}
	handlerNewLine.__orig = fnorig;
}

/*
 * Handler of `/shell` instruction.
 * 
 * @note If set shell mode, field `__on` will be true.
 *		  And it's counter part's function will be false.
 * @param String name: 'shell' instruction name.
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and change the view to shell mode.
 *
 */
function handlerShell(params)
{
	async_fetchUIShell(function(html){ 
		receiverUIShell(html); 
		async_fetchLineAll(receiverLines);
	});
	jQuery('#'+config.id.command).find('.'+config.styleclass.command.content).empty();

	handlerRead.__on = false;
	handlerShell.__on = true;

	if(undefined != handlerNewLine.__orig)
	{
		handlerNewLine = handlerNewLine.__orig;
	}
}

/*
 * Handler of `/list` instruction.
 * 
 * @param String name: 'list' instruction name.
 * @param String type: list what? option avaliable : 'file'
 * @return None
 * @modify The database and view.
 * @effect Write a new log for this instruction 
 *			and change the view to shell mode.
 *
 */
function handlerList(name,type)
{
	switch(type)
	{
		case config.instruction.list.type.file:
			async_fetchListFile(receiverListFile);
			handlerNewLine('/list',config.instruction.list.type.file
								,enumeration.type.line.instruction);
		break;

		default:
			handlerNewLine('/list',config.instruction.list.error
								,enumeration.type.line.error);
	}
}
