const Discord = require('discord.js');
const config = require('./config.json');
const Enmap = require('enmap');
const fs = require('fs');
const CronJob = require('cron').CronJob;

// enmap settings back-end
enmap = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
  });


gfTracker = new Enmap({name: "gfTracker"});

patreonGfTracker = new Enmap({name: "patreonGfTracker"});

// enmap settings front-end  
defaultSettings = {		
    adminRole: "GM",
    teamRole: "Team Admin",
    prefix: "!",	
    privateMessage: "Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands!",
    expoTime1: "09 45",
    expoTime2: "17 45",
    expoClear1: "11 01",
    expoClear2: "19 01",
    expoChannel: "general",
    expoMessage: "@everyone Expeditions are starting in 15 minutes! Good luck!",
    banquetTime: "18 00",
    banquetChannel: "general",
    banquetMessage: "@everyone Banquet is starting in 15 minutes!",
    fortTime: "18 45",
    fortChannel: 'general',
    fortMessage: '@everyone Guild fort in 15 minutes! Good luck!',
    teamChannel: 'general',
    teamChannel2: 'general',
    gfChannel: 'general',
    gfChannel2: 'general',
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
    patreonTeam: {
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
    },
    guildFort: {
        name: 'Guild Fort Team',
        team: [],
        buffMap: '',
        skillPage1User: '',
        skillPage2User: '',
        skillPage3User: '',
        skillPage4User: '',
        buffer1: '',
        buffer2: '',
        buffer3: '',
    },
    patreonGuildFort: {
        name: 'Guild Fort Team',
        team: [],
        buffMap: '',
        skillPage1User: '',
        skillPage2User: '',
        skillPage3User: '',
        skillPage4User: '',
        buffer1: '',
        buffer2: '',
        buffer3: '',
    },
    region: 'na'
};

const bot = new Discord.Client({
});


bot.commands = new Discord.Collection(); 

const banquet = [];

const fort = [];

const exped1 = [];

const exped2 = [];

const expedclear1 = [];

const expedclear2 = [];

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
                bot.commands.set(props.help.name, props);
                }
            }
        });
    });
});

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
                    });
        };
    
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
            });
        };
    
        const banquetReminder = () => {
         
            let banquetChannel = enmap.get(guild.id, 'banquetChannel');
            let banquetMessage = enmap.get(guild.id, 'banquetMessage');

            guild.channels
                .find(channel => {
                    if (channel.name === banquetChannel) {
                        channel
                            .send(banquetMessage)
                            .catch(console.error);
                    } else {
                        return;
                    }
                });
        };
    
        const expedAutoClear = () => {
            enmap.ensure(guild.id, defaultSettings);
            
            enmap.set(guild.id, [], 'team.team1.team');
            enmap.set(guild.id, [], 'team.team2.team');
            enmap.set(guild.id, [], 'team.team3.team');    
            
        };
        
        const fortAutoClear = () => {
            enmap.ensure(guild.id, defaultSettings);
            
            enmap.set(guild.id, [], 'guildFort.team'); 
        };

        const gfbTrackerAutoClear = () => {
            const filtered = gfTracker.filter(p => p.guild === guild.id);

            filtered.forEach(data => {
                gfTracker.delete(`${guild.id}-${data.user}`)
            })
        }

        let region = enmap.get(guild.id, 'region');

        let banquetTime = enmap.get(guild.id, 'banquetTime');

        let banqMin = banquetTime.charAt(3) + banquetTime.charAt(4);

        let banqHr = banquetTime.charAt(0) + banquetTime.charAt(1);
       
        let fortTime = enmap.get(guild.id, 'fortTime');

        let fortMin = fortTime.charAt(3) + fortTime.charAt(4);

        let fortHr = fortTime.charAt(0) + fortTime.charAt(1);

        let expoTime1 = enmap.get(guild.id, 'expoTime1');

        let expoMin1 = expoTime1.charAt(3) + expoTime1.charAt(4);

        let expoHr1 = expoTime1.charAt(0) + expoTime1.charAt(1);

        let expoTime2 = enmap.get(guild.id, 'expoTime2');

        let expoMin2 = expoTime2.charAt(3) + expoTime2.charAt(4);

        let expoHr2 = expoTime2.charAt(0) + expoTime2.charAt(1);

        let expoClear1 = enmap.get(guild.id, 'expoClear1');

        let expoClearMin1 = expoClear1.charAt(3) + expoClear1.charAt(4);

        let expoClearHr1 = expoClear1.charAt(0) + expoClear1.charAt(1);

        let expoClear2 = enmap.get(guild.id, 'expoClear2');

        let expoClearMin2 = expoClear2.charAt(3) + expoClear2.charAt(4);

        let expoClearHr2 = expoClear2.charAt(0) + expoClear2.charAt(1);


        if (region === 'eu') {

            exped1[guild.id] = new CronJob(`00 ${expoMin1} ${expoHr1} * * *`, expedReminder, null, true, 'Europe/Helsinki');

            exped2[guild.id] = new CronJob(`00 ${expoMin2} ${expoHr2} * * *`, expedReminder, null, true, 'Europe/Helsinki');
               
            fort[guild.id] = new CronJob(`00 ${fortMin} ${fortHr} * * *`, fortReminder, null, true, 'Europe/Helsinki');
                      
            banquet[guild.id] = new CronJob(`00 ${banqMin} ${banqHr} * * *`, banquetReminder, null, true, 'Europe/Helsinki');
               
            expedclear1[guild.id] = new CronJob(`00 ${expoClearMin1} ${expoClearHr1} * * *`, expedAutoClear, null, true, 'Europe/Helsinki');

            expedclear2[guild.id] = new CronJob(`00 ${expoClearMin2} ${expoClearHr2} * * *`, expedAutoClear, null, true, 'Europe/Helsinki');
        
            // new CronJob(`00 01 14,22 * * *`, expedAutoClear, null, true, 'Europe/Amsterdam');
            
            new CronJob(`00 01 00 * * *`, fortAutoClear, null, true, 'Europe/Helsinki');

            // new CronJob(`00 01 00 * * 1`, gfbTrackerAutoClear, null, true, 'Europe/Amsterdam')
        }

        else if (region === 'asia') {

            exped1[guild.id] = new CronJob(`00 ${expoMin1} ${expoHr1} * * *`, expedReminder, null, true, 'Asia/Taipei');

            exped2[guild.id] = new CronJob(`00 ${expoMin2} ${expoHr2} * * *`, expedReminder, null, true, 'Asia/Taipei');
               
            fort[guild.id] = new CronJob(`00 ${fortMin} ${fortHr} * * *`, fortReminder, null, true, 'Asia/Taipei');
                     
            banquet[guild.id] = new CronJob(`00 ${banqMin} ${banqHr} * * *`, banquetReminder, null, true, 'Asia/Taipei');
            
            expedclear1[guild.id] = new CronJob(`00 ${expoClearMin1} ${expoClearHr1} * * *`, expedAutoClear, null, true, 'Asia/Taipei');

            expedclear2[guild.id] = new CronJob(`00 ${expoClearMin2} ${expoClearHr2} * * *`, expedAutoClear, null, true, 'Asia/Taipei');
            // new CronJob(`00 01 13,21 * * *`, expedAutoClear, null, true, 'Asia/Taipei');
            
            new CronJob(`00 01 00 * * *`, fortAutoClear, null, true, 'Asia/Taipei');
            
            // new CronJob(`00 01 00 * * 1`, gfbTrackerAutoClear, null, true, 'Asia/Taipei')
        }
        
        else {

            exped1[guild.id] = new CronJob(`00 ${expoMin1} ${expoHr1} * * *`, expedReminder, null, true, 'America/Los_Angeles');

            exped2[guild.id]  = new CronJob(`00 ${expoMin2} ${expoHr2} * * *`, expedReminder, null, true, 'America/Los_Angeles');
    
            fort[guild.id] = new CronJob(`00 ${fortMin} ${fortHr} * * *`, fortReminder, null, true, 'America/Los_Angeles');
    
            banquet[guild.id]  = new CronJob(`00 ${banqMin} ${banqHr} * * *`, banquetReminder, null, true, 'America/Los_Angeles');

            expedclear1[guild.id] = new CronJob(`00 ${expoClearMin1} ${expoClearHr1} * * *`, expedAutoClear, null, true, 'America/Los_Angeles');

            expedclear2[guild.id] = new CronJob(`00 ${expoClearMin2} ${expoClearHr2} * * *`, expedAutoClear, null, true, 'America/Los_Angeles');
 
            // new CronJob(`00 01 11,19 * * *`, expedAutoClear, null, true, 'America/Anchorage');

            new CronJob(`00 01 00 * * *`, fortAutoClear, null, true, 'America/Los_Angeles');

            // new CronJob(`00 01 00 * * 1`, gfbTrackerAutoClear, null, true, 'America/Anchorage')
        }

         
    });

    
});
     

bot.on('message', function(message) {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    // if guild does not have enmap settings, set defaultSettings as default
    enmap.ensure(message.guild.id, defaultSettings);

    let msgPrefix = message.content.charAt(0);
    let prefix = enmap.get(message.guild.id, 'prefix');
    let region = enmap.get(message.guild.id, 'region');
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    const slimeServer = bot.guilds.get("511649193941794836");

    if (prefix == msgPrefix && commandfile && args[0] == "banquetTime") {
        commandfile.run(bot, message, args, banquet[message.guild.id]);
    } 

    else if (prefix == msgPrefix && commandfile && args[0] == "fortTime") {
        commandfile.run(bot, message, args, fort[message.guild.id]);
    } 

    else if (prefix == msgPrefix && commandfile && args[0] == "expoTime1") {
        commandfile.run(bot, message, args, exped1[message.guild.id]); 
    } 

    else if (prefix == msgPrefix && commandfile && args[0] == "expoTime2") {
        commandfile.run(bot, message, args, exped2[message.guild.id]); 
    } 

    else if (prefix == msgPrefix && commandfile && args[0] == "expoClear1") {
        commandfile.run(bot, message, args, expedclear1[message.guild.id]); 
    } 

    else if (prefix == msgPrefix && commandfile && args[0] == "expoClear2") {
        commandfile.run(bot, message, args, expedclear2[message.guild.id]); 
    } 

    else if (prefix == msgPrefix && commandfile && cmd == prefix + 'calc') {
        commandfile.run(bot, message, args, region);
    }

    else if (prefix == msgPrefix && commandfile && cmd == prefix + 'team') {
        commandfile.run(bot, message, args, slimeServer);
    } 

    else if (prefix == msgPrefix && commandfile && cmd == prefix + 'gf') {
        commandfile.run(bot, message, args, slimeServer);
    } 

    else if (prefix == msgPrefix && commandfile && cmd == prefix + 'setconf') {
        commandfile.run(bot, message, args, slimeServer);
    }

    else if (prefix == msgPrefix && commandfile) {
        commandfile.run(bot, message, args,);
    } 
 
});

// logs unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason);
});

// bot login
bot.login(config.token); 
