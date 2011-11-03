
/*
 * Handling the UI read received event.
 * 
 * @param String html
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Render and binding events on the UI view.
 */
function receiverUIRead(html)
{
	drawUIRead(html);
	initEventRead();

//Set mode Read
handlerShell.__on = false;
handlerRead.__on = true;
}

/*
 * Handling the UI shell received event.
 * 
 * @param String html
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Render and binding events on the UI view.
 */
function receiverUIShell(html)
{
	drawUIShell(html);
	initEventShell();

//Set mode Shell
handlerRead.__on = false;
handlerShell.__on = true;
}

/*
 * Handling the lines received event.
 *
 * @param [Line] lines
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Render all lines on the wall.
 */
function receiverLines(lines)
{
	updateLineWall(lines);
}

/*
 * Handling the comments received event.
 * 
 * @param [Comment] comments
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Render and binding event on comments, 
 *			and show them on the view.
 */
function receiverComments(comments)
{
	for(var itr = 0; itr != comments.length; itr++)
	{
		var comment = comments[itr];

		//Truncated comment's text if it's necessary.
		var rest = "";
		if(comment.content.length > config.misc.comment.maxlength)
		{
			truncated = truncateText(comment.content,config.misc.comment.maxlength)[0];
			rest = truncateText(comment.content,config.misc.comment.maxlength)[1];

			//Use standard "..." for the hint of continuing
			comment.content = truncated+'...';	
		}

		//Use standard '#'
		jQuery(dom_idtitle)
			.addClass(config.styleclass.comment.idtitle)
			.text(config.misc.comment.showtitle+'#'+itr).prependTo(dom_comment);

		//Setting up the comment's DOM.
		var dom_comment = renderComment(comment);
		jQuery(dom_comment)
			.attr(config.attribute.comment.truncated_rest,rest)
			.appendTo('#'+config.id.wall.comment)
			.bind('click',{'id':itr,'dom':dom_comment}
				,function(event){ 
					listenerShowComment(event,event.data.dom,event.data.id);
			});

		var dom_idtitle = document.createElement('div');
		

	}
}

/*
 * Handling the comments received event.
 * 
 * @param Post post
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Render and binding event on the post wall 
 *			and show them on the view.
 */
function receiverPost(post)
{
	updatePost(post);
	updatePostWall(post);
	jQuery('#'+config.id.wall.post.post).click(listenerShowPostWall);
}
