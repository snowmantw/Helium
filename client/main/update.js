
/*
 * Update the wall of lines.

 * 
 * @param [Line] lines: Array of lines.
 * @return None
 * @require jQuery
 * @modify The DOM message wall.
 * @effect CLEAR all and print out new lines.
 */
function updateLineWall(lines)
{

	jQuery('#'+config.id.wall.line).empty()
		.replaceWith(renderLineWall(lines));
	jQuery('#'+config.id.wall.line).hide().fadeIn('fast');
}


/*
 * Update the wall of comments.

 * 
 * @param [Comment] comments: Array of comments.
 * @return None
 * @require jQuery
 * @modify The DOM comment wall.
 * @effect CLEAR all and print out new comments.
 */
function updateCommentWall(comments)
{
	jQuery('#'+config.id.wall.comment).empty()
		.replaceWith(renderCommentWall(comments));
	jQuery('#'+config.id.wall.comment).hide().fadeIn('fast');
}

/*
 * Update the post.
 * The `renderPost()` function is not needed.
 * Unless multi-post in one page is needed.
 * 
 * @param Post post
 * @return None
 * @require jQuery
 * @modify The DOM post element.
 * @effect CLEAR existed post and show a new one.
 */
function updatePost(post)
{
	var dom_post = renderPost(post);
	
	//Remove the title in dom_post and put it on title.
	jQuery('#'+config.id.title)
		.empty();
	
	jQuery(dom_post).find('.'+config.styleclass.post.title)
		.appendTo('#'+config.id.title);

	jQuery('#'+config.id.post).empty()
		.append(dom_post);
	jQuery('#'+config.id.post).hide().fadeIn('fast');
}

/*
 * Update the post wall: show the post as a comment.
 *
 * @param Post post
 * @return None
 * @require jQuery
 * @modify The post wall.
 * @effect CLEAR existed post in it and show a new one.
 */
function updatePostWall(post)
{
	jQuery('#'+config.id.wall.post.title).text(post.title);
	jQuery('#'+config.id.wall.post.post)
		.find('.'+config.styleclass.comment.comment).hide().remove();
	jQuery('#'+config.id.wall.post.post).append(renderComment(post))
		.fadeIn();
}
