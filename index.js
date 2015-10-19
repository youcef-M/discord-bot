var Discordbot = require('discord.io');
var Config = require('./config.js');
var LolApi = require('leagueapi');



/**
 * Initializing league API
 */
LolApi.init(Config.developerKey, 'euw');



/**
 * 
 */
 

var Command = require("./lib/Command");
var CommandList = require("./lib/CommandList");
var CommandParser = require("./lib/CommandParser");


var list = new CommandList();
var parser = new CommandParser();



var bot = new Discordbot({
	email: Config.email,
	password: Config.password,
	autorun: Config.autorun
});

bot.on("err", function(error) {
	console.log(error)
});

bot.on("ready", function(rawEvent) {
	console.log("Connected!");
	console.log("Logged in as: ");
	console.log(bot.username + " - (" + bot.id + ")");
});

bot.on("message", function(user, userID, channelID, message, rawEvent) {
	console.log(user + " - " + userID);
	console.log("in " + channelID);
	console.log(message);
	console.log("----------");
	
	var lol = new Command('!lol', 1, function(name) {
    	LolApi.Summoner.getByName(name, function(err, summoner) {
		    if(!err) {
		    	summoner = summoner[Object.keys(summoner)[0]];
		        bot.sendMessage({
					to: channelID,
					message: 'name: ' + summoner.name + '\n' + 'level: ' + summoner.summonerLevel,
				});
		    }
		});
	});
	
	var out = new Command('!out', 0, function() {
	    if( user === "Litium" ) {
	    	bot.deleteMessage({
				channel: channelID,
				messageID: rawEvent.d.id
			});
			bot.disconnect()
	    }
	    ;
	});
	
	list.add([lol, out]);

	parser.init(list);
	
	var r = parser.parse(message);
	if (r) {
		list.execute(r[0], parser.parseArgs(r[1],true)[0]);
	}
	
	
	
	
/*	
	if (message === "ping") {
		bot.sendMessages(channelID, ["Pong"]); //Sending a message with our helper function
	} else if (message === "picture") {
		bot.sendFiles(channelID, ["snow.png"]); //Sending a file with our helper function
	}else if (message === "!out" && user === "Litium") {
    bot.deleteMessage({
      channel: channelID,
      messageID: rawEvent.d.id
    });
    bot.disconnect();
	}else if (message.indexOf(":'(") > -1) {
		bot.deleteMessage({
			channel: channelID,
			messageID: rawEvent.d.id
    	});

	    bot.sendMessage({
	      	to: channelID,
	      	message: "You cannot do that! @" + user,
			tts: true
	    });

		console.log("Message sent")
	}
*/
});

bot.on("disconnected", function() {
	console.log("Bot disconnected");
  process.exit()
	/*bot.connect()*/ //Auto reconnect
});
