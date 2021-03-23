const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args, region) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
    
    function parseTime(s) {
        var c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);
    }

    if (args[0] === undefined) {
        return message.channel.send(`Please input !calc followed by the end of hot time in HH:MM format (14:00 = 2:00pm). \n\nFor example: **!calc 14:00** helps calculate how much AB you need to fill if hot time ends at 14:00pm server time.`);
    }

    else if (args[0].includes(':')) {

        let splitTime = args[0].split(':');

        if (!isNaN(splitTime[0]) && !isNaN(splitTime[1])) {
            
            if (splitTime[0] < 24 && splitTime[1] < 60) {
                if (region === 'na') {
                    let currentTime = moment().tz('America/Anchorage').format('HH:mm');
        
                    let parsedInputtedTime = parseTime(args[0]);
                    let parsedCurrentTime = parseTime(currentTime);
        
        
                    if (parsedInputtedTime < parsedCurrentTime) {
                       
                        newParsedInputtedTime = parsedInputtedTime + 1440;
        
                        time = Math.abs(newParsedInputtedTime - parsedCurrentTime);
        
                        message.reply(`You will need to load ${time} minutes of AB`);
                      
                    }
        
                    else {
        
                        time = Math.abs(parsedInputtedTime - parsedCurrentTime);
            
                        message.reply(`You will need to load ${time} minutes of AB`);
                    }
                   
                }
            
                if (region === 'eu') {
                    let currentTime = moment().tz('Europe/Helsinki').format('HH:mm');
            
                    let parsedInputtedTime = parseTime(args[0]);
                    let parsedCurrentTime = parseTime(currentTime);
        
        
                    if (parsedInputtedTime < parsedCurrentTime) {
                       
                        newParsedInputtedTime = parsedInputtedTime + 1440;
        
                        time = Math.abs(newParsedInputtedTime - parsedCurrentTime);
        
                        message.reply(`You will need to load ${time} minutes of AB`);
                      
                    }
        
                    else {
        
                        time = Math.abs(parsedInputtedTime - parsedCurrentTime);
            
                        message.reply(`You will need to load ${time} minutes of AB`);
                    }
                }
            
                if (region === 'asia') {
                    let currentTime = moment().tz('Asia/Taipei').format('HH:mm');
            
                    let parsedInputtedTime = parseTime(args[0]);
                    let parsedCurrentTime = parseTime(currentTime);
        
        
                    if (parsedInputtedTime < parsedCurrentTime) {
                       
                        newParsedInputtedTime = parsedInputtedTime + 1440;
        
                        time = Math.abs(newParsedInputtedTime - parsedCurrentTime);
        
                        message.reply(`You will need to load ${time} minutes of AB`);
                      
                    }
        
                    else {
        
                        time = Math.abs(parsedInputtedTime - parsedCurrentTime);
            
                        message.reply(`You will need to load ${time} minutes of AB`);
                    }
                }
            }
           
            else {
                message.channel.send(`Please input !calc followed by the end of hot time in HH:MM format (14:00 = 2:00pm). \n\nFor example: **!calc 14:00** helps calculate how much AB you need to fill if hot time ends at 14:00pm server time.`);
            }
        }
        
        else {
            message.channel.send(`Please input !calc followed by the end of hot time in HH:MM format (14:00 = 2:00pm). \n\nFor example: **!calc 14:00** helps calculate how much AB you need to fill if hot time ends at 14:00pm server time.`);
        }
        
    }

    else {
        message.channel.send(`Please input !calc followed by the end of hot time in HH:MM format (14:00 = 2:00pm). \n\nFor example: **!calc 14:00** helps calculate how much AB you need to fill if hot time ends at 14:00pm server time.`);
    }
    

    
       
    };
module.exports.help = {
    name: 'calc'
};