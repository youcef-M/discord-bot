var api = require('leagueapi');
var Config = require('../../../Config');
api.init(Config.developerKey, 'euw');

var Command = require('../../Command');
exports.commandArray =function() {
  return [
    new Command('!lol', 1, function(args) {
      api.Summoner.getByName(args[0],function(err, summoner)  {
        if (err) {
          console.log(err);
        }else {
          console.log(summoner);
        }
      });
    }),
    new Command('!elo', 2, function(args) {
      api.Stats.getRanked(args[0], args[1], 'euw', function(err, rank) {
        if(err) {
          console.log(err);
        }else {
          console.log(rank);
        }
      });
    })

  ];
}
