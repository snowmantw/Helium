
config.instruction = {};
config.instruction.fallback = '/log';

config.instruction.help = {};
config.instruction.help.content = "可使用：/help /version /linenumber /post /read /shell";

config.instruction.version = {};
config.instruction.version.content = "2.3.5";

config.instruction.linenumber = {};
config.instruction.linenumber.on = 'on';
config.instruction.linenumber.off = 'off';
config.instruction.linenumber.error = "ERROR : Usage : /linenumber [on|off]";

config.instruction.read = {};
config.instruction.read.error = "無法讀取指定行：該行內容可能不是文章";

config.instruction.list = {};

config.instruction.list.error = "ERROR : Usage : /list [file]";

config.instruction.list.type = {};
config.instruction.list.type.file = 'file'; 

config.instruction.list.file = {};
config.instruction.list.file.name = '[List Files]';
