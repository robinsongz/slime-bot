const Discord = require('discord.js');



module.exports.run = async (bot, message) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;


    // list available bot commands
     
            message.author.send({embed: {
                color: 3447003,
                fields: [{
                    name: "**__Public Commands__**",
                    value: "**!fuse** : fusing calc, cost, and various data \n **!jewel** : jewel data \n **!team** : expedition check-ins (can only be used in teamChannel config) \n **!party** : party check-ins \n **!gf** : guild fort checkin-ins (can only be used in gfChannel config) \n  **!exalt** : exalt data \n **!potential** : potentials data \n **!pba** : weapon pba data \n **!calc** : help calculate how much AB to load \n **!help** : list of commands"
                },
                {
                    name: "**__Admin Commands__**",
                    value: "**!showconf** : show current configurations \n**!setconf** : edit configurations \n **!resetconf** : resets configurations to default settings"
                }
                ]
            }
            });

            message.reply(`Check your DM!`);
       

        
    };


module.exports.help = {
    name: "help"
};