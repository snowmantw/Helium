

/*
 * Handle showing the comment event.
 * 
 * @param Event event
 * @param DOM dom: The comment DOM.
 * @param Number id: The #comment of the post.
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Clear the current post and render this comment as a post.
 */
function listenerShowComment(event,dom,id)
{
	var comment = extractComment(dom);

	//Add the title: "[Fixed text]#[comment]"
	comment.title = config.misc.comment.showtitle+' # '+id;

	//Remove current focus class.
	jQuery('#'+config.id.wall.comment)
		.find('.'+config.styleclass.comment.focus)
		.removeClass(config.styleclass.comment.focus);

	//Post may be reading ( focus ).
	jQuery('#'+config.id.wall.post.post)
		.find('.'+config.styleclass.comment.comment)
		.removeClass(config.styleclass.comment.focus);

	jQuery('#'+config.id.wall.post.title)
		.removeClass(config.styleclass.comment.focus);

	jQuery(dom).addClass(config.styleclass.comment.focus);

	//Update comment as post. 
	updatePost(comment);

	jQuery('html body').hide().scrollTop(0).fadeIn();
}


/*
 * Handle showing the post event.
 * 
 * @param Event event
 * @return None
 * @require jQuery
 * @modify The view.
 * @effect Clear the current posting and render the post in post wall..
 */
function listenerShowPostWall(event)
{
	var title = jQuery('#'+config.id.wall.post.title).text();

	var post = extractComment(jQuery('#'+config.id.wall.post.post)
								.find('.'+config.styleclass.comment.comment));

	//Remove current focused comment's class.
	jQuery('#'+config.id.wall.comment)
		.find('.'+config.styleclass.comment.focus)
		.removeClass(config.styleclass.comment.focus);

	jQuery('#'+config.id.wall.post.post)
		.find('.'+config.styleclass.comment.comment)
		.addClass(config.styleclass.comment.focus);

	jQuery('#'+config.id.wall.post.title)
		.addClass(config.styleclass.comment.focus);

	post.title = title;

	updatePost(post);
}
