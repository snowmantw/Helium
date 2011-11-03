
Post = function(id,title,content,author,date)
{
	this.id = id;
	this.title = title;
	this.content = content;
	this.author = author;
	this.date = date;
}

Comment = function(id,content,author,date)
{
	this.id = id;
	this.content = content;
	this.author = author;
	this.date = date;
}

/* `date` is NUMBER */
Line = function(id,type,name,content,date)
{
	this.id = id;
	this.type = type;
	this.name = name;
	this.content = content;
	this.date = date;
}

/* No rendering/extracting function for this datum type.*/
Summary = function(id,title,author,date)
{
	this.id = id;
	this.title = title;
	this.author = author;
	this.date = date;
}

/* For server saved records. */
Record = function(id,type)
{
	this.id = id;
	this.type = type;
}
