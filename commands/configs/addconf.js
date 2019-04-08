const Discord = require('discord.js');


module.exports.run = async (bot, message) =>  {
    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

        // adding config to all guilds
      
            enmap.forEach( (val, key) => enmap.set(key, 'na', "region") );
      
        
    }


module.exports.help = {
    name: 'addconf'
}