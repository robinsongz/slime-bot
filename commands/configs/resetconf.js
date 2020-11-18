const Discord = require('discord.js');


module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
       
     // resets configurations to default

        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.adminRole);
        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("You're not an admin, sorry!");
        }

        enmap.delete(message.guild.id);
        message.channel.send(`You're configurations have been reset to default settings`);

    };



module.exports.help = {
    name: 'resetconf'
};