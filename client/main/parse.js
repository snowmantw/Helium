
//Test passed @ 2011-10-25 14:21:40+08:00

/*
 * Parse the line name and extract the instruction ( if it exists ).
 * 
 * @param String name
 * @return String : The instruction or null . ([a-z]|[0-9]|[_-.])+
 * @modify None
 * @effect None
 */
function parseInstruction(name)
{
	var m = name.match(/\/(([a-z]|[0-9]|[-_.])+)/);
	if( null != m ) { return m[1]}
	
	return null;
}


/*
 * Parse the line content and extract the arguments.
 * Arguments are seperated by '\ ' : slash and a space character.
 *
 * @param String content
 * @return [String] : Arguments.
 * @modify
 * @effect
 */
function parseArgument(content)
{
	var args = content.split(/;;/);
	return args;
}
