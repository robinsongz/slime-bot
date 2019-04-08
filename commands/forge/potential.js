const commando = require('discord.js-commando');
const config = require('../../config.json');


module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
        //Potentials data

        return message.reply(`https://imgur.com/a/zWIgBp9?`)
        
       
    }


module.exports.help = {
    name: 'potential'
}