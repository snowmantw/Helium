
/*
 * Notify some handlers with a signal. 
 * 
 * @param  String signal
 * @return None
 * @modify Processing flow.
 * @effect Notify and execute the handler.
 */
function notify(signal)
{
	var assoc_handler = {};
	assoc_handler[enumeration.event.command.send] = 
		function(){
			//Pick the command name and handling it.
			var name = jQuery('#'+config.id.command)
						.find('.'+config.styleclass.line.name)
						.val();
			var content = jQuery('#'+config.id.command)
							.find('.'+config.styleclass.line.content)
							.text();

			var ins = parseInstruction(name);

			if(null == ins)	//Not a instruction. Is a log.
			{ 
				ins = parseInstruction(config.instruction.fallback);
				var arg = content;	//Log needn't parsed args.
			}
			else
			{
				var arg = parseArgument(content);	
				name = ins;
			}

			//The first item in params is the command name OR message poster's name.
			dispatchInstruction(ins,[name].concat(arg));
		}

	var handler = assoc_handler[signal];
	if(undefined === handler)
	{ throw new Error("No such signal handler for : "+signal); }

	handler();
}
