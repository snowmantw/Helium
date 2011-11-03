
/*
 * Dispatch parsed instruction and arguments
 * 
 * @note Register handler MANUALLY in this function code !
 *
 * @param String ins
 * @param [String] params
 * @return None
 * @modify Processing flow.
 * @effect Instruction and params will be dispatch 
 *			to one handler and be executed.
 *
 */
function dispatchInstruction(ins,params)
{
	var assoc_handler = {};
	if(true == handlerRead.__on)
	{
		assoc_handler['shell']  = handlerShell;
		assoc_handler['comment']  = handlerComment;
		assoc_handler['log']  = handlerLog;
	}
	else if(true == handlerShell.__on)
	{
		assoc_handler['help'] = handlerHelp;
		assoc_handler['shell'] = handlerShell;
		assoc_handler['version'] = handlerVersion;
		assoc_handler['linenumber'] = handlerLineNumber;
		assoc_handler['read'] = handlerRead;
		assoc_handler['post'] = handlerPost;
		assoc_handler['list'] = handlerList;
		assoc_handler['log']  = handlerLog;
	}
	else
	{
		throw new Error("No such mode.");
	}

	var handler = assoc_handler[ins];
	if(undefined === handler)
	{
		handler = handlerNewLine;
		params = ["ERROR"
					,"無此指令："+ins
					,enumeration.type.line.error];
	}

	//Handler receive param is `(String,String....)`  .
	//2011-11-01 22:06:30+08:00
	handler.apply(null,params);
}
