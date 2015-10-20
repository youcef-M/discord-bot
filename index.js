var Command = require("./lib/Command");
var CommandList = require("./lib/CommandList");
var CommandParser = require("./lib/CommandParser");
var Helper = require('./lib/Helper');

var lolCommands = require('./lib/commands/lol/Summoner.js').commandArray();

var list = new CommandList();
var parser = new CommandParser();

Helper.log('Initializing variables')

var a = new Command('!a',0,function(name){
  name = parser.parseArgs(name, true);
  console.log('The name argument passed is:');
  console.log(name);
});

var b = new Command('!b', 0, function(user) {
  console.log('user is:' + user);
});

list.add(lolCommands);
parser.updateList(list);

Helper.log('Waiting for user input');
var command = '!elo 21710247 5';

var parsed = parser.parse(command, list);
var trigger = parser.trigger(parsed[0]);

var args = parser.parseArgs(parsed[1], true)
if(trigger !== false) {
  Helper.log('Command triggers, attempting to execute it...');
  list.execute(trigger, args);
  Helper.log('Execution successfull');
}
