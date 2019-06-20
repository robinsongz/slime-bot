const Discord = require('discord.js');

module.exports.run = async (bot, message, args, slimeServer) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
    
  
    
    
    
};
module.exports.help = {
    name: 'test'
};