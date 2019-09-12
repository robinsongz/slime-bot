const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
        
    // rebirth calculation

    const rebirthCalc = (x, y, xboost, yboost) => {

        let fixed1 = (x == 'phyatk' || x == 'magatk' || x == 'phydef' || x == 'magdef');

        let fixed2 = (y == 'maxhp' || y == 'maxmp');

        let percent1 = (x == 'critdmg' || x == 'critrate');

        let percent2 = (y == 'droprateinc' || y == 'mesodropinc' || y == 'bossatk' || y == 'critrate' || y == 'critdmg' || y == 'expinc');
        // fixed x fixed
        if (fixed1 && fixed2) {
            
            let convertedxboost = xboost / 100;

            return convertedxboost * yboost;
        }

        // percent x percent
        if (percent1 && percent2) {
            let convertedxboost = xboost / 100;
            let convertedyboost = yboost / 100;

            let result = convertedxboost * convertedyboost;

            return result * 100;
        }

        // fixed x percent

        if (fixed1 && percent2) {

            let convertedxboost = xboost / 100;
            let calibratedyboost = yboost * 10;

            return convertedxboost * calibratedyboost;
        }

        // percent x fixed

        if (percent1 && fixed2) {
            let calibratedxboost = xboost * 10;
            let convertedyboost = yboost / 100;

            return convertedyboost * calibratedxboost;
        }
    }

    let [ calc, x, y, xboost, yboost ] = args;

    if (calc == 'calc') {

       let result = rebirthCalc(x, y, xboost, yboost);

       if (x == 'phyatk' || x == 'magatk' || x == 'phydef' || x == 'magdef') {
        message.reply(`You will gain ${result} ${x}`);
       }

       if (x == 'critdmg' || x == 'critrate') {
        message.reply(`You will gain ${result}% ${x}`);
       }
       
    }
    

   

    };


module.exports.help = {
    name: 'rebirth'
};