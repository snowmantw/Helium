

function async_fetchListBucket(fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchListBucket,
		'type': 'GET',
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * List S3's file infos.
 * 
 * @param String bucket
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: {'fnames':[]}
 * @return None
 * @require None
 * @modify Data flow.
 * @effect Receive the data and forward it to the handler.
 */
function async_fetchListFileBucket(bucket,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchListFileBucket,
		'type': 'GET',
		'dataType': 'json',
		'contentType':'application/json',
		'data':{'bucket':bucket},
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * List S3's file infos.
 * 
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: {'fnames':[]}
 * @return None
 * @require None
 * @modify Data flow.
 * @effect Receive the data and forward it to the handler.
 */
function async_fetchListFile(fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchListFile,
		'type': 'GET',
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Fetch ALL RECORDs.
 * 
 * @param Function fn_success
 * @param Function fn_error
 * @receive [Record]
 * @return None
 * @require jQuery
 * @modify None
 * @effect None
 */
function async_fetchRecordAll(fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchRecordAll,
		'type': 'GET',
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}


/*
 * Fetch ALL lines.
 *
 * @param Function fn_success
 * @param Function fn_error
 * @receive [Line]
 * @return None
 * @require jQuery
 * @modify None
 * 
 */
function async_fetchLineAll(fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchLineAll,
		'type': 'GET',
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Fetch the read UI HTML.
 * 
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: The html.
 * @return None
 * @require jQuery
 * @modify None
 * @effect None
 */
function async_fetchUIRead(fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchUIRead,
		'type': 'GET',
		'dataType': 'html',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Fetch the shell UI HTML.
 * 
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: The html.
 * @return None
 * @require jQuery
 * @modify None
 * @effect None
 */
function async_fetchUIShell(fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchUIShell,
		'type': 'GET',
		'dataType': 'html',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Fetch a post.
 * 
 * @param String id: The post id.
 * @param Function fn_success
 * @param Function fn_error
 * @receive Post
 * @return None
 * @require jQuery
 * @modify None
 * @effect None
 */
function async_fetchPost(id,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchPost,
		'type': 'GET',
		'dataType': 'json',
		'contentType':'application/json',
		'data':{'id':id},
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Fetch a summary.
 * 
 * @param String id: The post id.
 * @param Function fn_success
 * @param Function fn_error
 * @receive Summary
 * @return None
 * @require jQuery
 * @modify None
 * @effect None
 */
function async_fetchSummary(id,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchSummary,
		'type': 'GET',
		'dataType': 'json',
		'contentType':'application/json',
		'data':JSON.stringify({'id':id}),
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Fetch comments related to one post.
 * 
 * @param String id: The post id.
 * @param Function fn_success
 * @param Function fn_error
 * @receive [Comment]
 * @return None
 * @require jQuery
 * @modify None
 * @effect None
 */
function async_fetchComments(id,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.fetchComments,
		'type': 'GET',
		'dataType': 'json',
		'contentType':'application/json',
		'data':({'id':id}),
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Delete a post.
 * 
 * @param String id: The post id.
 * @param Function fn_success
 * @param Function fn_error
 * @receive None
 * @return None
 * @require jQuery
 * @modify Data in server.
 * @effect Delete a post.
 */
function async_deletePost(id,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.deletePost,
		'type': 'DELETE',
		'contentType':'application/json',
		'data':({'id':id}),
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Delete a comment.
 * 
 * @param String id: The comment id.
 * @param Function fn_success
 * @param Function fn_error
 * @receive None
 * @return None
 * @require jQuery
 * @modify Data in server.
 * @effect Delete a comment in a post.
 */
function async_deleteComment(id,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.deleteComment,
		'type': 'DELETE',
		'contentType':'application/json',
		'data':({'id':id}),
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Save a post.
 * It's ok if this post is just created and has no id.
 * 
 * @param Post post: The post.
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: The post's id.
 * @return None
 * @require jQuery
 * @modify Data in server.
 * @effect Create or update a post.
 */
function async_savePost(post,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.savePost,
		'type': 'POST',
		'contentType':'application/json',
		'data':JSON.stringify(post),
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Save a comment.
 * It's ok if this comment is just created and has no id.
 * 
 * @param String pid: The post's id.
 * @param Comment comment: The comment.
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: The comment's id.
 * @return None
 * @require jQuery
 * @modify Data in server.
 * @effect Create or update a comment.
 */
function async_saveComment(pid,comment,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.saveComment,
		'type': 'POST',
		'contentType':'application/json',
		'data':JSON.stringify({'id':pid,'comment':comment}),
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}

/*
 * Save a line. No "updating" for a line.
 * Every line that will be saved is a new line.
 * 
 * @param Line line: The line.
 * @param Function fn_success
 * @param Function fn_error
 * @receive String: The line's id.
 * @return None
 * @require jQuery
 * @modify Data in server.
 * @effect Create or update a comment.
 */
function async_saveLine(line,fn_success,fn_error)
{
	jQuery.ajax({
		'url': config.api.saveLine,
		'type': 'POST',
		'contentType':'application/json',
		'data':JSON.stringify({'line':line}),
		'dataType': 'json',
		'success': fn_success,
		'error': fn_error
	});
}


