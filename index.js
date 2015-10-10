var Discordbot = require('discord.io');
var Config = require('./config.js');
var bot = new Discordbot({
	email: Config.email,
	password: Config.password,
	autorun: Config.autorun
});
var util = require('util');


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
	console.log("--      --");
	console.log("----------");

	if (message === "ping") {
		bot.sendMessages(channelID, ["Pong"]); //Sending a message with our helper function
	} else if (message === "picture") {
		bot.sendFiles(channelID, ["snow.png"]); //Sending a file with our helper function
	}else if (message == "!out") {
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
    });

		console.log("Message sent")
	}
});

bot.on("disconnected", function() {
	console.log("Bot disconnected");
  process.exit()
	/*bot.connect()*/ //Auto reconnect
});
