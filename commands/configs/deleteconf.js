const Discord = require('discord.js');


module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
       
    // deleting config from all guilds

     
            // enmap.forEach( (val, key) => enmap.delete(key, "team3") );
        
        
    };


module.exports.help = {
    name: 'deleteconf'
};