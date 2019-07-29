const Discord = require('discord.js');


module.exports.run = async (bot, message) =>  {
    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

        // adding config to all guilds
      
        // enmap.forEach( (val, key) => enmap.set(key, {
        //     name: 'Guild Fort Team',
        //     team: [],
        //     buffMap: '',
        //     skillPage1User: '',
        //     skillPage2User: '',
        //     skillPage3User: '',
        //     skillPage4User: '',
        //     buffer1: '',
        //     buffer2: '',
        //     buffer3: '',
        // }, "patreonGuildFort") );

        // enmap.forEach( (val, key) => enmap.set(key, "11 01", "expoClear1") );

        // enmap.forEach( (val, key) => enmap.set(key, "19 01", "expoClear2") );

      
        
    };


module.exports.help = {
    name: 'addconf'
};