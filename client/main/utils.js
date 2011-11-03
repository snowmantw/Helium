
Date.prototype.toRFC3339 = function()
{
	var year = this.getFullYear();

	//JS Date object month begin from 0.
	var month = this.getMonth()+1;	
	var date = this.getDate();
	var hours = this.getHours();
	var mins = this.getMinutes();
	var secs = this.getSeconds();

	return (year+'-'+month+'-'+date+' '+hours+':'+mins+':'+secs);
}

/*
 * When text is too ling, truncate it.
 *
 * @param String txt: The text.
 * @param Number limit: The max length.
 * @return [String]: The truncated text.
 * @modify None
 * @effect None
 */
function truncateText(txt,limit)
{
	return [txt.substring(0,limit - 1), txt.substring(limit,txt.length - 1)];
}

