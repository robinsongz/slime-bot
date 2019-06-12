const Discord = require('discord.js');

   
module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
       // if (command === 'send') {
            // bot.guilds.forEach(guild => guild.owner.send(`Hi all! Thanks for adding Slime Bot! Please join my discord server to ask any questions and keep up with updates! https://discord.gg/DVjQ39K`))
        // }
        
    };


module.exports.help = {
    name: 'send'
};