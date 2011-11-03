
// Tested @ 2011-10-20 13:48:19+08:00

/*
 * Render a new DOM wall of lines.
 * Will render line datums as instruction/error/log automatically.
 * 
 * @param [Line] lines: Array of datum lines.
 * @return DOM: The new DOM wall.
 * @require jQuery
 * @modify: None
 * @effect: None
 */
function renderLineWall(lines)
{
	var dom_wall = document.createElement('div');

	jQuery(dom_wall)
		.attr('id',config.id.wall.line)
		.addClass(config.styleclass.wall.line);

	var buff = document.createDocumentFragment();

	//buff can't prepend. Use itr to prepend (inverse append).
	for(var itr = lines.length - 1;itr >= 0 ; itr--)
	{
		var renderfn = null;
		switch(lines[itr].type)
		{
			case enumeration.type.line.log:
				renderfn = renderLog;
			break;
			case enumeration.type.line.error:
				renderfn = renderError;
			break;
			case enumeration.type.line.instruction:
				renderfn = renderInstruction;
			break;
			
			default:
				throw new Error("Unknown LINE TYPE for rendering : "
							+lines[itr].type);
		}
		buff.appendChild(renderfn(lines[itr]));
	}

	dom_wall.appendChild(buff);
	return dom_wall;
}

/*
 * Render a new DOM command line.
 * Command line is the input element for user inputs.
 * 
 * @param Line line: Datum contains instruction/error/log.
 * @return DOM: The new DOM command line.
 * @require jQuery
 * @modify: None
 * @effect: None
 */
function renderCommand(line)
{
	var dom_name = document.createElement('input');
	var dom_content = document.createElement('span');
	var dom_line = document.createElement('div');
	
	jQuery(dom_name).addClass(config.styleclass.command.name)
		.val(line.name).appendTo(dom_command);
	jQuery(dom_content).addClass(config.styleclass.command.content)
		.text(line.content).appendTo(dom_command);
	jQuery(dom_command)
		.addClass(config.styleclass.command.command);

	return dom_command;
}

/*
 * Render a new DOM text line.
 * 
 * @param Line line: Datum contains instruction/error/log.
 * @return DOM: The new DOM command line.
 * @require jQuery
 * @modify: None
 * @effect: None
 */
function renderLine(line)
{
	var dom_name = document.createElement('input');
	var dom_content = document.createElement('div');
	var dom_line = document.createElement('div');
	
	jQuery(dom_name).val(line.name).attr('disabled','disabled')
		.addClass(config.styleclass.line.name).appendTo(dom_line);
	jQuery(dom_content).text(line.content)
		.addClass(config.styleclass.line.content).appendTo(dom_line);

	//Id means data record's "id".
	jQuery(dom_line)
		.attr(config.attribute.line.id,line.id)
		.attr(config.attribute.line.type,line.type)
		.attr(config.attribute.line.date,line.date)
		.addClass(config.styleclass.line.line);

	return dom_line;
}

 
/*
 * Render a new instruction line.
 *
 * @param Line line: Datum contains instruction/error/log.
 * @return DOM: The new DOM instruction line.
 * @require jQuery
 * @modify: None
 * @effect: None
 */
function renderInstruction(line)
{
	//Use `renderLine()` to make basic dom.
	//And add classes later.
	var dom_line = renderLine(line);	

	jQuery(dom_line)
		.children('.'+config.styleclass.line.name)
		.addClass(config.styleclass.instruction.name);

	jQuery(dom_line)
		.children('.'+config.styleclass.line.content)
		.addClass(config.styleclass.instruction.content);

	return dom_line;
}

/*
 * Render a new log line.
 * 
 * @param Line line: Datum contains instruction/error/log.
 * @return DOM: The new DOM log line.
 * @require jQuery
 * @modify None
 * @effect None
 */
function renderLog(line)
{
	//Use `renderLine()` to make basic dom.
	//And add classes later.
	var dom_line = renderLine(line);

	jQuery(dom_line)
		.children('.'+config.styleclass.line.name)
		.addClass(config.styleclass.log.name);

	jQuery(dom_line)
		.children('.'+config.styleclass.line.content)
		.addClass(config.styleclass.log.content);

	return dom_line;
}

/*
 * Render a new error line.
 * 
 * @param Line line: Datum contains instruction/error/log.
 * @return DOM: The new DOM error line.
 * @require jQuery
 * @modify None
 * @effect None
 */
function renderError(line)
{
	//Use `renderLine()` to make basic dom.
	//And add classes later.
	var dom_line = renderLine(line);

	jQuery(dom_line)
		.children('.'+config.styleclass.line.name)
		.addClass(config.styleclass.error.name);

	jQuery(dom_line)
		.children('.'+config.styleclass.line.content)
		.addClass(config.styleclass.error.content);

	return dom_line;
}


/*
 * Render the wall of comments.
 * 
 * @param [Comment] comments: Datums contain post comments.
 * @return DOM: The new DOM wall of comment.
 * @require jQuery
 * @modify None
 * @effect None
 */
function renderCommentWall(comments)
{
	var dom_wall = document.createElement('div');
	jQuery(dom_wall).addClass(config.styleclass.wall.comment);

	var buff = document.createDocumentFragment();
	for(var itr in comments)
	{
		buff.appendChild(renderComment(comments[itr]));
	}

	dom_wall.appendChild(buff);
	return dom_wall;
}

/*
 * Render a new comment.
 * 
 * @param Comment comment: Datum contains a comment in one post.
 * @return DOM: The new DOM comment.
 * @require jQuery,Date.prototype.toRFC3339()
 * @modify None
 * @effect None
 */
function renderComment(comment)
{
	var dom_name = document.createElement('span');
	var dom_date = document.createElement('span');

	//DOM line wrap name and date.
	var dom_info = document.createElement('div');	

	var dom_content = document.createElement('div');
	var dom_comment = document.createElement('div');

	var short_content = comment.content;
	var rest = "";
	var truncated = comment.content;

	if(comment.content.length > config.misc.comment.maxlength)
	{
		truncated = truncateText(comment.content,config.misc.comment.maxlength)[0];
		rest = truncateText(comment.content,config.misc.comment.maxlength)[1];

		//Use standard "..." for the hint of continuing
		short_content = truncated+'...';	
	}
	
	jQuery(dom_name).text(comment.author)
		.addClass(config.styleclass.comment.author)
		.appendTo(dom_info);
	jQuery(dom_date).text((new Date(comment.date)).toRFC3339())
		.addClass(config.styleclass.comment.date)
		.appendTo(dom_info);

	jQuery(dom_info)
		.addClass(config.styleclass.comment.infomation)
		.appendTo(dom_comment);

	jQuery(dom_content).text(short_content)
		.addClass(config.styleclass.comment.content)
		.appendTo(dom_comment);

	jQuery(dom_comment).addClass(config.styleclass.comment.comment)
		.attr(config.attribute.comment.id,comment.id)
		.attr(config.attribute.comment.date,comment.date)
		.attr(config.attribute.comment.truncated_rest,rest);

	return dom_comment;
}


/*
 * Render a new post.
 * 
 * @param Post post: Datum contains article,title,auth,date and etc..
 * @return DOM: The new DOM post.
 * @modify None
 * @effect None
 */
function renderPost(post)
{
	var dom_title = document.createElement('div');
	var dom_author = document.createElement('span');
	var dom_date = document.createElement('span');

	//DOM line wrap author and date.
	var dom_footnote = document.createElement('div');	
	var dom_head = document.createElement('div');

	var dom_content = document.createElement('div');
	var dom_post = document.createElement('div');

	jQuery(dom_title)
		.addClass(config.styleclass.post.title)
		.text(post.title).appendTo(dom_head);
	
	jQuery(dom_author).addClass(config.styleclass.post.author)
		.text(post.author).appendTo(dom_footnote);

	jQuery(dom_date).addClass(config.styleclass.post.date)
		.text((new Date(post.date)).toRFC3339())
		.appendTo(dom_footnote);

	jQuery(dom_head).addClass(config.styleclass.post.head)
		.appendTo(dom_post);

	jQuery(dom_content).addClass(config.styleclass.post.content)
		.text(post.content)
		.appendTo(dom_post);

	jQuery(dom_footnote)
		.addClass(config.styleclass.post.footnote)
		.appendTo(dom_post);

	jQuery(dom_post)
		.attr(config.attribute.post.id,post.id)
		.attr(config.attribute.post.date,post.date)
		.addClass(config.styleclass.post.post);

	return dom_post;
}

/*
 * Render the prompt element.
 * 
 * @param String txt : Text or HTML code in the prompt.
 * @return DOM 
 * @require jQuery
 * @modify None
 * @effect None
 */
function renderPrompt(txt)
{
	var dom_pmt = document.createElement('span');
	jQuery(dom_pmt).addClass(config.styleclass.line.prompt)
		.html(txt);
	return dom_pmt;
}
