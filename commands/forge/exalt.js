const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
    // exalt data
    const [prop] = args;

    if (prop === 'weapon') {
        return message.channel.send(`https://imgur.com/a/Qp1eu9B`);
    }
    
    else if (prop === 'armor1') {
        return message.channel.send(`https://imgur.com/s8YhEE7`);
    }

    else if (prop === 'armor2') {
        return message.channel.send(`https://imgur.com/4Nx7A5r`);
    }

    else {
        return message.channel.send(`Please type **!exalt weapon**, **!exalt armor1**, or **!exalt armor2**`)
    }

    };


module.exports.help = {
    name: 'exalt'
};