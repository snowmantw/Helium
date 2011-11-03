
/*
 * Initialize the application.
 *
 * @param None
 * @return None
 * @modify The application.
 * @effect Call all init functions.
 */
function initialize()
{
	//Get and draw the page.

	//Initialize decorating.
	initDecorateCommandLine();

	//Initialize events.
	//Command line is a static component.
	initEventCommandLine();

	//Default mode is Shell.
	//And loading all lines.
	async_fetchUIShell(function(html){
		receiverUIShell(html);
		async_fetchLineAll(receiverLines);
	});
}

/*
 * Initialize all events in the shell view.
 *
 * @param None
 * @return None
 * @modify The view.
 * @effect Binding all events with elements.
 */
function initEventShell()
{

}

/*
 * Initialize all events in the read view.
 *
 * @param None
 * @return None
 * @modify The view.
 * @effect Binding all events with elements.
 */
function initEventRead()
{

}


/*
 * Initialize decorating behaviors.
 * 
 * @param None
 * @return None
 * @modify The render function(s) and DOM elements. 
 * @effect Decorating DOM elements and render function(s) 
 *			to setup the init view env.
 */
function initDecorateCommandLine()
{
	//Default: do NOT show line numbers.
	setPromptRenderNormal();
	blinkCommandPrompt();
	makeCommandHelperEnter()
}

/*
 * Initialize the command line UI events.
 *
 * @param None
 * @return None
 * @require jQuery
 * @modify DOM elements in command line area.
 * @effect Bind DOM elements with events.
 *
 */
function initEventCommandLine()
{
	initEventCommandLineName();
	initEventCommandLinePrompt();
	initEventCommandLineEnter();
}

function disableEventCommandLine()
{
	disableEventCommandLinePrompt();
	disableEventCommandLineName();
	disableEventCommandLineEnter();
}

function disableEventCommandLinePrompt()
{
	jQuery('#'+config.id.command)
		.find('.'+config.styleclass.line.prompt).unbind('click');
}

function disableEventCommandLineName()
{
	jQuery('#'+config.id.command)
		.find('.'+config.styleclass.line.name).unbind();
}

function disableEventCommandLineEnter()
{
	jQuery('.'+config.styleclass.command.enter)
		.unbind();
}

/*
 * Initialize the command line UI events with the prompt DOM.
 *
 * @param None
 * @return None
 * @require jQuery
 * @modify DOM element of command line prompt
 * @effect Bind DOM the element with events.
 *
 */
function initEventCommandLinePrompt()
{
	jQuery('#'+config.id.command)
		.find('.'+config.styleclass.line.prompt)
		.click(function(){
			notify(enumeration.event.command.send); 
		});
}

/*
 * Initialize the command line UI events with the name element.
 *
 * @param None
 * @return None
 * @require jQuery
 * @modify DOM element of command line's name field.
 * @effect Bind DOM the element with events.
 *
 */
function initEventCommandLineName()
{
	jQuery('#'+config.id.command)
		.find('.'+config.styleclass.line.name)
		.keypress(function(event){
			if(event.which == 13 || event.keyCode == 13)
			{ notify(enumeration.event.command.send); }
		});
}

/*
 * Initialize the command line UI events with the enter helper.
 *
 * @param None
 * @return None
 * @require jQuery
 * @modify DOM element of command line's enter helper element.
 * @effect Bind DOM the element with events.
 *
 */
function initEventCommandLineEnter()
{
	jQuery('.'+config.styleclass.command.enter)
		.click(function(event){
			notify(enumeration.event.command.send);
		});
}
