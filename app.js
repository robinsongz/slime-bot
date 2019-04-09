const Discord = require('discord.js');
const config = require('./config.json');
const Enmap = require('enmap');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const CronTime = require('cron').CronTime;

// enmap settings back-end
enmap = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
  })


// enmap settings front-end  
defaultSettings = {		
    adminRole: "GM",
    prefix: "!",	
    privateMessage: "Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands!",
    expoChannel: "general",
    expoMessage: "@everyone Expeditions are starting in 15 minutes! Good luck!",
    banquetTime: "00 18",
    banquetChannel: "general",
    banquetMessage: "@everyone Banquet is starting in 15 minutes!",
    fortMessage: '@everyone Guild fort in 15 minutes! Good luck!',
    fortChannel: 'general',
    teamChannel: 'general',
    team: {
        team1: {
            name: "Team 1", 
            team: []
        },
        team2: {
            name: "Team 2",
            team: [] 
        },
        team3: {
            name: "Team 3",
            team: []
        }
    },
    party: {
        party1: {
            name: 'Party 1',
            team: []
        },
        party2: {
            name: 'Party 2',
            team: [] 
        },
        party3: {
            name: 'Party 3',
            team: []
        }
    }
}

const bot = new Discord.Client({
});

bot.commands = new Discord.Collection(); 

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
   
      if (!file.endsWith(".js")) return;
      
      const event = require(`./events/${file}`);
     
      let eventName = file.split(".")[0];
     
      bot.on(eventName, event.bind(null, bot));
    });
  });

// This loop reads the /commands/ folder and registrates every js file as a new command
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    if (files.length <= 0) {
        return;
    }

    files.forEach((f, i) => {
        fs.readdir("./commands/" + f, (err, file) => {
            for (i in file) {
                let props = require(`./commands/${f}/${file[i]}`);
                if (!!props.help) {
                bot.commands.set(props.help.name, props)
                }
            }
        })
    })
})


bot.on('ready', () => {
    console.log(`Serving ${bot.guilds.size} servers`);
    console.log('Ready boss!');

    bot.guilds.forEach((guild) => {

        enmap.ensure(guild.id, defaultSettings);

        const expedReminder = () => {
        
            let expoChannel = enmap.get(guild.id, "expoChannel");
                            
            let expoMessage = enmap.get(guild.id, "expoMessage");
                
                guild.channels
                    .find((channel) => {
                        if (channel.name === expoChannel) {
                            channel
                                .send(expoMessage)
                                .catch(console.error);
                        } else {
                            return;
                        }
                    })
        }
    
        const fortReminder = () => {
            let fortChannel = enmap.get(guild.id, "fortChannel");
                            
            let fortMessage = enmap.get(guild.id, "fortMessage");
    
                
            guild.channels
                .find((channel) => {
                    if (channel.name === fortChannel) {
                        channel
                            .send(fortMessage)
                            .catch(console.error);
                    } else {
                        return;
                    }
            })
        }
    
        const banquetReminder = () => {
         
            let banquetChannel = enmap.get(guild.id, 'banquetChannel');
            let banquetMessage = enmap.get(guild.id, 'banquetMessage');
        
            guild.channels
                .find(channel => channel.name === banquetChannel)
                .send(banquetMessage)
                .catch(console.error);
                    
        
        }
    
        const expedAutoClear = () => {
            enmap.ensure(guild.id, defaultSettings);
            
            enmap.set(guild.id, [], 'team1.team');
            enmap.set(guild.id, [], 'team2.team');
            enmap.set(guild.id, [], 'team3.team');    
        }
        
        let region = enmap.get(guild.id, 'region');


        if (region === 'eu') {

            new CronJob('00 45 12,20 * * *', expedReminder, null, true, 'Europe/Amsterdam');
               
            new CronJob('00 45 21 * * *', fortReminder, null, true, 'Europe/Amsterdam');
                
            let banquetTime = enmap.get(guild.id, 'banquetTime');
                      
            banquetCron = new CronJob(`00 ${banquetTime} * * *`, banquetReminder, null, true, 'Europe/Amsterdam');
        
            new CronJob(`00 01 14,22 * * *`, expedAutoClear, null, true, 'Europe/Amsterdam')
        
        }

        else if (region === 'asia') {

            new CronJob('00 45 12,20 * * *', expedReminder, null, true, 'Asia/Taipei');
                      
            new CronJob('00 45 21 * * *', fortReminder, null, true, 'Asia/Taipei');
                   
            let banquetTime = enmap.get(guild.id, 'banquetTime');
                      
            banquetCron = new CronJob(`00 ${banquetTime} * * *`, banquetReminder, null, true, 'Asia/Taipei');
            
            new CronJob(`00 01 14,22 * * *`, expedAutoClear, null, true, 'Asia/Taipei');
        
        }
        
        else {

            new CronJob('00 45 12,20 * * *', expedReminder, null, true, 'America/Los_Angeles');
    
            new CronJob('00 45 21 * * *', fortReminder, null, true, 'America/Los_Angeles');
    
            let banquetTime = enmap.get(guild.id, 'banquetTime');
                  
            banquetCron = new CronJob(`00 ${banquetTime} * * *`, banquetReminder, null, true, 'Europe/Amsterdam');

            new CronJob(`00 01 14,22 * * *`, expedAutoClear, null, true, 'America/Los_Angeles')
        }

        
    })

    
})
    

bot.on('message', function(message) {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    // if guild does not have enmap settings, set defaultSettings as default
    enmap.ensure(message.guild.id, defaultSettings);

    let msgPrefix = message.content.charAt(0);
    let prefix = enmap.get(message.guild.id, 'prefix');
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if (prefix == msgPrefix && commandfile && args[0] == "banquetTime") {
        commandfile.run(bot, message, args, banquetCron) 
    } 

    else if (prefix == msgPrefix && commandfile) {
        commandfile.run(bot, message, args) 
    } 
 
})

// logs unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

// bot login
bot.login(config.token); 