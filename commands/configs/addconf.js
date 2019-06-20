const Discord = require('discord.js');


module.exports.run = async (bot, message) =>  {
    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

        // adding config to all guilds
      
            enmap.forEach( (val, key) => enmap.set(key, "general", "gfChannel2") );

            enmap.forEach( (val, key) => enmap.set(key, "general", "teamChannel2") );

            enmap.forEach( (val, key) => enmap.set(key, {
                team1: {
                    name: "Team 1", 
                    team: []
                },
                team2: {
                    name: "Team 2",
                    team: [] 
                },
                team3: {
                    name: "Team 3",
                    team: []
                }
            }, "patreonTeam") );

            enmap.forEach( (val, key) => enmap.set(key, {
                name: 'Guild Fort Team',
                team: []
            }, "patreonGuildFort") );

      
        
    };


module.exports.help = {
    name: 'addconf'
};