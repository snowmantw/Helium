

// Tested @ 2011-10-20 13:47:55+08:00

/*
 * Extract content and make a line object from DOM.
 * This function will identify the line type automatically,
 *	so it's needn't to define functions like `extractCommand()` and etc.
 *
 * @param DOM dom_line: The DOM line.
 * @return Line: Line datum. 
 * @require jQuery
 * @modify None
 * @effect None
 */
function extractLine(dom_line)
{
	return new Line(
		jQuery(dom_line).attr(config.attribute.line.id),
		jQuery(dom_line).attr(config.attribute.line.type),
		jQuery(dom_line).children('.'+config.styleclass.line.name)
			.eq(0).val(),
		jQuery(dom_line).children('.'+config.styleclass.line.content)
			.text() ,
		jQuery(dom_line).attr(config.attribute.line.date));
}


/*
 * Extract contents in the wall of lines and make an array of data.
 * 
 * @param DOM dom_wall: The DOM wall of line.
 * @return [Line]: Array of line datum.
 * @require jQuery
 * @modify None
 * @effect None
 */
function extractLineWall(dom_wall)
{
	//TODO: Confirm if handler can access outside vars ?
	var arrline = [];

	jQuery(dom_wall).children('.'+config.styleclass.line.line)
		.each(function(idx){
			arrline.push(extractLine(this));
		});

	return arrline;
}

/*
 * Extract the wall of comments.
 * 
 * @param DOM dom_wall: The DOM wall of comments
 * @return [Comment]: Array of comment datum.
 * @require jQuery
 * @modify None
 * @effect None
 */
function extractCommentWall(dom_wall)
{
	//TODO: Confirm if handler can access outside vars ?
	var arr_comment = [];

	jQuery(dom_wall).children('.'+config.styleclass.comment.comment)
		.each(function(idx){
			arr_comment.push(extractComment(this));
		});

	return arr_comment;
}

/*
 * Extract content and make a comment object from DOM.
 * 
 * @param DOM dom_comment
 * @return Comment: The comment datum.
 * @require jQuery
 * @modify None
 * @effect None
 */
function extractComment(dom_comment)
{
	//Restore the truncated text.
	var truncated = jQuery(dom_comment)
							.find('.'+config.styleclass.comment.content).text();
	var rest = jQuery(dom_comment).attr(config.attribute.comment.truncated_rest);
	var short_content = truncated;

	//Has been truncated.
	if(rest != "")
	{
		//Last 3 char is "..."
		var short_content = truncated.substr(0,truncated.length - 3);

	}
	full_content = short_content + rest;

	return new Comment(
		 jQuery(dom_comment).attr(config.attribute.comment.id)
		,full_content
		,jQuery(dom_comment)
			.find('.'+config.styleclass.comment.author).text()
		,Number(jQuery(dom_comment).attr(config.attribute.comment.date))
	);
}

/*
 * Extract content and make a post object from DOM.
 * 
 * @param DOM dom_post
 * @return Post: The post datum.
 * @require jQuery Date.prototype.toRFC3339()
 * @modify None
 * @effect None
 */
function extractPost(dom_post)
{
	return new Post(
		jQuery(dom_post).attr(config.attribute.post.id),
		jQuery(dom_post)
			.find('.'+config.styleclass.post.title).text(),
		jQuery(dom_post)
			.find('.'+config.styleclass.post.content).text(),
		jQuery(dom_post)
			.find('.'+config.styleclass.post.author).text(),
		Number(jQuery(dom_post).attr(config.attribute.post.date))
	);
}

/*
 * Extract the prompt text or html code in prompt element.
 * 
 * @param DOM dom_prompt
 * @return String
 * @require jQuery
 * @modify None
 * @effect None
 */
function extractPrompt(dom_prompt)
{
	return (jQuery(dom_prompt).html());
}
