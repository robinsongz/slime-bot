const Discord = require('discord.js');



module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
        // pba sheet

            return message.reply(`https://imgur.com/a/1lotika`);
        
        
    };


module.exports.help = {
    name: 'pba'
};