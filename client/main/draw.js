
/*
 * CLEAR and redraw the "Shell" UI accroding stringified HTML.
 * This drawing is only drawing at the config.id.view element.
 * 
 * @param String html_ui
 * @return None
 * @require jQuery
 * @modify The <BODY> DOM element.
 * @effect Draw elements and insert them into <BODY> element.
 */
function drawUIShell(html_ui)
{
	jQuery('#'+config.id.view).empty().hide()
		.append(html_ui).fadeIn('fast');
	
	//Remove Read css and replace it with the Shell one.
	var dom_csslink = document.createElement('link');

	jQuery('#'+config.id.css.read).remove();
	jQuery(dom_csslink).attr('id',config.id.css.shell)
		.attr('href',config.misc.path.css.shell)
		.attr('rel','stylesheet')
		.attr('type','text/css')
		.appendTo('head');

	jQuery('#'+config.id.title).empty().text(config.misc.title.shell);
}

/*
 * CLEAR and redraw the "Read" UI accroding stringified HTML.
 * This drawing is only drawing at the config.id.view element.
 * 
 * @param String html_ui
 * @return None
 * @require jQuery
 * @modify The <BODY> DOM element.
 * @effect Draw elements and insert them into <BODY> element.
 */
function drawUIRead(html_ui)
{
	jQuery('#'+config.id.view).empty().hide()
		.append(html_ui).fadeIn('fast');

	//Remove Read css and replace it with the Shell one.
	var dom_csslink = document.createElement('link');

	jQuery('#'+config.id.css.shell).remove();
	jQuery(dom_csslink).attr('id',config.id.css.read)
		.attr('href',config.misc.path.css.read)
		.attr('rel','stylesheet')
		.attr('type','text/css')
		.appendTo('head');
}
