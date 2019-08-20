const Discord = require('discord.js');


module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
        // Link to Jello's f2p guide

        return message.reply(`https://docs.google.com/document/d/1hC1uFr0KRo8UDK8eqoYPFwFmllja4mW1wc5uBOT3bqQ/edit?usp=sharing`);
        
       
    };


module.exports.help = {
    name: 'f2pguide'
};