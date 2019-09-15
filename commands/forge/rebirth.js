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

            return Math.round(convertedxboost * yboost);
        }

        // percent x percent
        if (percent1 && percent2) {
            let convertedxboost = xboost / 100;
            let convertedyboost = yboost / 100;

            let result = convertedxboost * convertedyboost;

            return Math.round(result * 100);
        }

        // fixed x percent

        if (fixed1 && percent2) {

            let convertedxboost = xboost / 100;
            let calibratedyboost = yboost * 10;

            return Math.round(convertedxboost * calibratedyboost);
        }

        // percent x fixed

        if (percent1 && fixed2) {
            let calibratedxboost = xboost * 10;
            let convertedyboost = yboost / 100;

            return Math.round(convertedyboost * calibratedxboost);
        }
    }

    let [ first, x, y, xboost, yboost ] = args;

    if (first == 'calc') {

       let result = rebirthCalc(x, y, xboost, yboost);
       if (isNaN(xboost) === true || isNaN(yboost)) {
        return message.reply('You must enter a number! Type !rebirth help to see how the formula works!')
       }

       else if (x == 'phyatk' || x == 'magatk' || x == 'phydef' || x == 'magdef') {
        message.reply(`You will gain ${result} ${x}`);
       }

       else if (x == 'critdmg' || x == 'critrate') {
        message.reply(`You will gain ${result}% ${x}`);
       }
       
    }

    else if (first == 'data') {
        message.reply ('https://imgur.com/EFAqNIn')
    }

    else if (first == 'help') {

        message.author.send({embed: {
            color: 3447003,
            fields: [{
                name: "**__Let me help you with rebirth calculations!__**",
                value: "Command: '!rebirth calc [value A] [value B] [boost A] [boost B]' \n \n An example of the in-game wording compared to formula: \n \n Crit DMG proportionate to EXP increase 100% \n\n !rebirth calc critdmg expinc 100 [boostB] \n\n critdmg = value A\n expinc = value B\n 100 = boost A\n  boost B = whatever your exp increase is (only including the ones influenced by rebirth flame) \n \n If Exp Increase is 10%, completed command will be: \n !rebirth calc critdmg expinc 100 10"
              },
              {
                name: "**__Examples__**",
                value: "!rebirth calc phyatk critrate 500 5.5 \n\n !rebirth calc magatk maxmp 19.7 1115"
              },
              {
                  name: "**__Current Value A Options__**",
                  value: "phyatk, magatk, critrate, critdmg, phydef, magdef \n\n"
              },
              {
                  name: "**__Current Value B Options__**",
                  value: "maxhp, maxmp, droprateinc, mesodropinc, bossatk, critrate, critdmg, expinc"
              },
              {
                  name: "**__Other Rebirth Commands__**",
                  value: "**!rebirth data** : rebirth flame data \n"
              }

            ],
          }
        });

        message.reply(`Check your DM!`);
    }

    else {
        message.reply ('Please type !rebirth help')
    }
    

   

    };


module.exports.help = {
    name: 'rebirth'
};