
/*
 * Make the command prompt blink.
 * 
 * @param None
 * @return None
 * @require jQuery
 * @modify The prompt DOM element in command.
 * @effect Make it blinking.
 */
function blinkCommandPrompt()
{
	var dom_pmt = jQuery('#'+config.id.command)
		.find('.'+config.styleclass.command.prompt);

	//If ATTR has blinking, blink it.
	//Otherwise , stop.
	if(undefined === blinkCommandPrompt.__blink) 
	{ blinkCommandPrompt.__blink = true ;}		

	if(false == blinkCommandPrompt.__blink)
	{ blinkCommandPrompt.__blink = true; return; }

	var opc = (jQuery(dom_pmt).css("opacity")==1)?0:1;

	jQuery('#'+config.id.command)
		.find('.'+config.styleclass.command.prompt).animate(
			{ opacity: opc}, 400, blinkCommandPrompt );


}

/*
 * Stop the command prompt blinking.
 * 
 * @param None
 * @return None
 * @require jQuery,extract.js
 * @modify The prompt DOM element in command.
 * @effect Stop the blinking.
 */
function stopBlinkCommandPrompt()
{
	//Find and set the prompt blinking attr cancel.
	if(true == blinkCommandPrompt.__blink)
	{ blinkCommandPrompt.__blink = false; }

	jQuery('#'+config.id.command)
		.find('.'+config.styleclass.command.prompt).stop().css('opacity','1');
	
	blinkCommandPrompt.__blink = true;
}

/*
 * Freeze the command prompt blinking and repace it with another icon means waiting.
 * 
 * @param None
 * @return None
 * @require jQuery
 * @modify The prompt DOM element in command
 * @effect Freeze prompt blinking and repace it with another icon means waiting.
 */
function blockCommandPrompt()
{
	stopBlinkCommandPrompt();

	var dom_pmt = jQuery('#'+config.id.command)
					.find('.'+config.styleclass.command.prompt)[0];
	var dom_wait = renderPrompt(config.misc.prompt.wait);

	jQuery(dom_pmt).replaceWith(dom_wait);

}

/*
 * Unfreeze the prompt.
 * 
 * @param None
 * @return None
 * @require jQuery
 * @modify The prompt DOM element in command
 * @effect Unfreeze the prompt.
 */
function resumeCommandPrompt()
{
	var dom_wait = jQuery('#'+config.id.command)
					.find('.'+config.styleclass.command.prompt)[0];
	var dom_pmt = renderPrompt(config.misc.prompt.command);
	jQuery(dom_wait).replaceWith(dom_pmt);

//	initEventCommandLinePrompt();
	blinkCommandPrompt();
}


/*
 * Decorate the `renderLineWall()` function 
 *	to turn on the linen number rendering.
 *
 * @note The original version will be saved 
 *		  in this function's `__orig` field.
 * @note If now is linenumber mode , `__on` field will be true.
 *
 * @param None
 * @return Function: The original `renderLineWall()` function
 * @modify Function `renderLineWall()`
 * @effect Prepend a line number DOM elements after rendering lines.
 */
function setPromptRenderLineNumber()
{
	if(setPromptRenderLineNumber.__on) { return; }

	//The real original version maybe already be overriding.
	//Get the original version from another decorating function.
	if(undefined != setPromptRenderNormal.__orig)
	{
		renderLineWall = setPromptRenderNormal.__orig;
	}

	setPromptRenderLineNumber.__orig = renderLineWall;	

	var __orig = renderLineWall;	

	renderLineWall = function(lines)
	{
		var dom_wall = __orig(lines);
		jQuery(dom_wall).children('.'+config.styleclass.line.line)
			.each(function(idx,elem){

				//TODO: Tricky...idx MUST < 100
				if(idx < 10)
				{ jQuery(elem).prepend(renderPrompt(idx+' ')); }
				else 
				{ jQuery(elem).prepend(renderPrompt(idx)); }
			});
		return dom_wall;
	}

	setPromptRenderLineNumber.__on = true;
	setPromptRenderNormal.__on = false;

	return __orig;
}

/*
 * Decorate the `renderLineWall()` function 
 *	to turn on the line prompt rendering with fixed text.
 *
 * @note The original version will be saved in this function's `__orig` field.
 * @note If now is linenumber mode , `__on` field will be true.
 *
 * @param None
 * @return Function: The "original" `renderLineWall()` function.
 * @require config.misc.prompt.normal : Set the "normal" prompt text.
 * @modify Function `renderLineWall()`
 * @effect Prepend prompt DOM elements with passed text after rendering lines.
 */
function setPromptRenderNormal()
{
	if(setPromptRenderNormal.__on) { return; }

	//The real original version maybe already be overriding.
	//Get the original version from another decorating function.
	if(undefined != setPromptRenderLineNumber.__orig)
	{
		renderLineWall = setPromptRenderLineNumber.__orig;
	}

	setPromptRenderNormal.__orig = renderLineWall;	

	var __orig = renderLineWall;	

	renderLineWall = function(lines)
	{
		var dom_wall = __orig(lines);
		jQuery(dom_wall).children('.'+config.styleclass.line.line)
			.each(function(idx,elem){
				jQuery(elem).prepend(renderPrompt(config.misc.prompt.normal));
			});
		return dom_wall;
	}

	setPromptRenderNormal.__on = true;
	setPromptRenderLineNumber.__on = false;

	return __orig;
}

/*
 * Show line numbers.
 *
 * @param None
 * @return None
 * @require jQuery
 * @modifiy DOM elements of lines.
 * @effect Show a line number before each line.
 */
function showLineNumber()
{
	//Set `lineRender()` function render the prompt with id.
	setPromptRenderLineNumber();

	var dom_wall = jQuery('#'+config.id.wall.line)[0];

	//Re-render the wall with new prompts.
	var newer = renderLineWall(extractLineWall(dom_wall));
	

	//Update the wall.
	jQuery(dom_wall).replaceWith(newer);
	jQuery(newer).attr('id',config.id.wall.line).hide().fadeIn();
}

/*
 * Hide line numbers.
 *
 * @param None
 * @return None
 * @require jQuery
 * @modifiy DOM elements of lines.
 * @effect Hide the line number before each line.
 */
function hideLineNumber()
{
	//Set `lineRender()` function render the prompt with id.
	setPromptRenderNormal();

	var dom_wall = jQuery('#'+config.id.wall.line)[0];

	//Re-render the wall with new prompts.
	var newer = renderLineWall(extractLineWall(dom_wall));

	//Update the wall.
	jQuery(dom_wall).replaceWith(newer);
	jQuery(newer).attr('id',config.id.wall.line).hide().fadeIn();
}

/*
 * Make and insert an enter helper DOM in command line.
 * 
 * @param None
 * @return None
 * @modify The command area DOM element.
 * @effect Insert a DOM element to help user input more intuitive.
 */
function makeCommandHelperEnter()
{
	var dom_enter = document.createElement('a');

	jQuery(dom_enter).html('&nbsp;')
		.attr('href','#')
		.addClass(config.styleclass.command.enter)
		.appendTo('#'+config.id.command);
}
