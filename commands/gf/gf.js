const Discord = require('discord.js');


module.exports.run = async (bot, message, args, slimeServer) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);
    const key = `${message.guild.id}-${message.author.id}`;

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

        
        let gfChannel = enmap.get(message.guild.id, 'gfChannel');
        let gfChannel2 = enmap.get(message.guild.id, 'gfChannel2');
         
        
    
        if (message.channel.name === gfChannel) {
            // gf check-ins
        
            gfTracker.ensure(key, {
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
            });

                const [ prop ] = args;
                    let member = message.member.displayName;
                    // variable for getting gf team from enmap
                    let gf = enmap.get(message.guild.id, 'guildFort.team');
                    let buffMap = enmap.get(message.guild.id, 'guildFort.buffMap');
                    let skillPage1User = enmap.get(message.guild.id, 'guildFort.skillPage1User');
                    let skillPage2User = enmap.get(message.guild.id, 'guildFort.skillPage2User');
                    let skillPage3User = enmap.get(message.guild.id, 'guildFort.skillPage3User');
                    let skillPage4User = enmap.get(message.guild.id, 'guildFort.skillPage4User');
                    let buffer1 = enmap.get(message.guild.id, 'guildFort.buffer1');
                    let buffer2 = enmap.get(message.guild.id, 'guildFort.buffer2');
                    let buffer3 = enmap.get(message.guild.id, 'guildFort.buffer3');

                    //variable for gf team
                    let gfTeam = 'guildFort.team';
                    //variable for gf name
                    let gfName = 'guildFort.name';

                    //function to push member into gf array
                    const gfPush = (member, gf) => {
                        return enmap.push(message.guild.id, member, gf);
                    };

                    //function to remove member from gf
                    const gfRemove = (member, gf) => {
                        return enmap.remove(message.guild.id, member, gf);
                    };

                    //function to set gf to whatever value
                    const gfSet = (value, gf) => {
                        return enmap.set(message.guild.id, value, gf);
                    };

                    // if gf spot is undefined, replace with " "
                    const gfList = (index, gfNumber) => {
                        return gfNumber[index] === undefined ? "-" : gfNumber[index];
                    };

                    //discord embed function
                    const gfEmbed = (name, gfNumber) => {
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name}__**`,
                                value: ` 1. ${gfList(0, gfNumber)} \n2. ${gfList(1, gfNumber)} \n3. ${gfList(2, gfNumber)} \n4. ${gfList(3, gfNumber)} \n5. ${gfList(4, gfNumber)} \n6. ${gfList(5, gfNumber)} \n7. ${gfList(6, gfNumber)} \n8. ${gfList(7, gfNumber)} \n9. ${gfList(8, gfNumber)} \n10. ${gfList(9, gfNumber)} \n11. ${gfList(10, gfNumber)} \n12. ${gfList(11, gfNumber)} \n13. ${gfList(12, gfNumber)} \n14. ${gfList(13, gfNumber)} \n15. ${gfList(14, gfNumber)} \n16. ${gfList(15, gfNumber)} \n17. ${gfList(16, gfNumber)} \n18. ${gfList(17, gfNumber)} \n19. ${gfList(18, gfNumber)} \n20. ${gfList(19, gfNumber)}`
                            },
                            ]
                        }
                        });
                    };

                    //full gf variables
                    let fullgf = !gf.includes(undefined) && gf.length === 20;
                

                    //variables for if gf includes member
                    let includesMember = gf.includes(member);
                    
                
                    //variables for getting gf names from enmap
                    let name = enmap.get(message.guild.id, 'guildFort.name');

                    // checking in
                    if (prop === "checkin") {
                    
                        const [ prop, value ] = args;

                        
                            // if gf 1 is full
                            if (fullgf) {

                                return message.reply('Guild Fort list is full!');
                            }

                            else if (gf.includes(member)) {
                                return message.reply(`You're already checked in!`);
                            }
                    
                            else {
                    
                                gfPush(member, gfTeam);
                            
                                message.reply(`you just checked in to ${name}.`);
                        
                                gfEmbed(name, gf);
                            } 
                        }
                    
                    
                    // checking out
                    else if (prop === "checkout") {
                    
                
                        if (includesMember) {

                        gfRemove(member, gfTeam);

                        message.reply(`you have been removed from ${name}`);

                        gfEmbed(name, gf);
                        }

                        else {
                            return message.reply(`You aren't checked in.`);
                        }

                    }

                    // removing member
                    else if (prop === 'remove') {

                        const [prop, ...value] = args;

                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("Hey, you're not the boss of me!");
                        }

                        let hi = gf[value-1];

                        if (isNaN(value)) {
                            return message.reply(`Please enter '!gf remove <number>'`);
                        }

                        else {

                            gfRemove(hi, gfTeam);

                            message.channel.send(`${hi} has been removed from ${name}`);

                            gfEmbed(name, gf);
                        }
                        
                    }

                    // adding member
                    else if (prop === 'add') {

                        const [prop, ...value] = args;

                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("Hey, you're not the boss of me!");
                        }


                        if (value) {
                            if (gf.includes(value.join(" "))) {
                                return message.reply(`${value.join(" ")} is already checked in to ${name}`);
                            }

                            else if (fullgf) {
                                return message.reply(`${name} is already full!`);
                            }
                
                            else {
                                message.channel.send(`${value.join(" ")} has been added to ${name}`);

                                gfPush(value.join(" "), gfTeam);
                    
                                gfEmbed(name, gf);
                            }

                        }
                        
                        else {
                            return message.reply(`Please enter '!gf add <display name>`);
                        }
                    }
            
                
                    // clearing gfs
                    else if (prop === "clear") {

                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("You're not an admin, sorry!");
                        }

                            gfSet([], gfTeam);

                            return message.channel.send(`${name} has been cleared.`);
                        
                    }

                    // viewing gfs
                    else if (prop === "view") {

                        enmap.ensure(message.guild.id, defaultSettings);

                
                        gfEmbed(name, gf);
                    
                    }


                    // changing gf title

                    else if (prop === 'edit') {

                        const [ prop, ...value ] = args;

                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("Hey, you're not the boss of me!");
                        }

                    
                            gfSet(value.join(" "), gfName);

                            return message.reply(`You have changed guild fort title to ${value.join(" ")}`);
            
                    }

                    // mentioning checked-in members

                    else if (prop === 'mention') {

                        const [ prop, ...value ] = args;

                        // if user is null, replace with ""

                        const realUser = (user) => {
                            return user === null ? "" : user;
                        };

                            let user1 = message.guild.members.find(member => member.displayName == gf[0]);

                            let user2 = message.guild.members.find(member => member.displayName == gf[1]);

                            let user3 = message.guild.members.find(member => member.displayName == gf[2]);

                            let user4 = message.guild.members.find(member => member.displayName == gf[3]);

                            let user5 = message.guild.members.find(member => member.displayName == gf[4]);

                            let user6 = message.guild.members.find(member => member.displayName == gf[5]);

                            let user7 = message.guild.members.find(member => member.displayName == gf[6]);

                            let user8 = message.guild.members.find(member => member.displayName == gf[7]);

                            let user9 = message.guild.members.find(member => member.displayName == gf[8]);

                            let user10 = message.guild.members.find(member => member.displayName == gf[9]);

                            let user11 = message.guild.members.find(member => member.displayName == gf[10]);

                            let user12 = message.guild.members.find(member => member.displayName == gf[11]);

                            let user13 = message.guild.members.find(member => member.displayName == gf[12]);

                            let user14 = message.guild.members.find(member => member.displayName == gf[13]);

                            let user15 = message.guild.members.find(member => member.displayName == gf[14]);

                            let user16 = message.guild.members.find(member => member.displayName == gf[15]);

                            let user17 = message.guild.members.find(member => member.displayName == gf[16]);

                            let user18 = message.guild.members.find(member => member.displayName == gf[17]);

                            let user19 = message.guild.members.find(member => member.displayName == gf[18]);

                            let user20 = message.guild.members.find(member => member.displayName == gf[19]);

                        
                                
                            return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} ${realUser(user7)} ${realUser(user8)} ${realUser(user9)} ${realUser(user10)} ${realUser(user11)} ${realUser(user12)} ${realUser(user13)} ${realUser(user14)} ${realUser(user15)} ${realUser(user16)} ${realUser(user17)} ${realUser(user18)} ${realUser(user19)} ${realUser(user20)}  : \n ${value.join(" ")}`);
                    }

                    else if (prop === 'assign') {
                        let patreonRole = slimeServer.roles.get('592523621898125323').id;

                        let gmRole = slimeServer.roles.get('519626665551200257').id;
            
                        // mapping all members with patreon role into an array.
                        let patreonMembers = slimeServer.roles.get(patreonRole).members.map(member => {
                            return member.user.id;
                        })
            
                        let gmMembers = slimeServer.roles.get(gmRole).members.map(member => {
                            return member.user.id;
                        })
                    
                        // if member is patron
                        const foundPatreon = patreonMembers.includes(message.member.id);
                        const foundGm = gmMembers.includes(message.member.id);

                        if (foundGm === true || foundPatreon === true) {
                            let [ prop, firstValue, ...secondValue ] = args;

                            if (firstValue === 'buffMap') {
                                gfSet(secondValue.join(" "), 'guildFort.buffMap');
    
                                return message.channel.send(`You've set \`${secondValue.join(" ")}\` as the \`guild fort buff map\``);
                            }
    
                            if (firstValue === 'page1') {
                                gfSet(secondValue.join(" "), 'guildFort.skillPage1User');
    
                                return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 1 User\``);
                            }
    
                            if (firstValue === 'page2') {
                                gfSet(secondValue.join(" "), 'guildFort.skillPage2User');
    
                                return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 2 User\``);
                            }
    
                            if (firstValue === 'page3') {
                                gfSet(secondValue.join(" "), 'guildFort.skillPage3User');
    
                                return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 3 User\``);
                            }
    
                            if (firstValue === 'page4') {
                                gfSet(secondValue.join(" "), 'guildFort.skillPage4User');
    
                                return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 4 User\``);
                            }
    
                            if (firstValue === 'buffer1') {
                                gfSet(secondValue.join(" "), 'guildFort.buffer1');
    
                                return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`buffer 1\``);
                            }
    
                            if (firstValue === 'buffer2') {
                                gfSet(secondValue.join(" "), 'guildFort.buffer2');
    
                                return message.channel.send(`You've set ${secondValue.join(" ")} as \`buffer 2\``);
                            }
    
                            if (firstValue === 'buffer3') {
                                gfSet(secondValue.join(" "), 'guildFort.buffer3');
    
                                return message.channel.send(`You've set ${secondValue.join(" ")} as \`buffer 3\``);
                            }

                            if (firstValue === 'clear') {
                                gfSet("", 'guildFort.buffMap');
                                gfSet("", 'guildFort.skillPage1User');
                                gfSet("", 'guildFort.skillPage2User');
                                gfSet("", 'guildFort.skillPage3User');
                                gfSet("", 'guildFort.skillPage4User');
                                gfSet("", 'guildFort.buffer1');
                                gfSet("", 'guildFort.buffer2');
                                gfSet("", 'guildFort.buffer3');

                                return message.channel.send(`You have cleared your gfb assignments!`);
                            }
    
                            if (firstValue === 'help') {
    
                                message.reply(`Check your DM!`);
    
                                message.author.send({embed: {
                                    color: 3447003,
                                    fields: [{
                                        name: "**__GFB Assign Commands__**",
                                        value: `**!gf assign buffMap** \n**!gf assign page[#] \n**!gf assign buffer[#]**`
                                    }]
                                    }
                                });
    
                            }
    
                            else {
                                return message.channel.send('Please type `!gf assign help`');
                            }
                        }

                        else {
                            message.reply(`This command is limited to Patrons! Become a patron here: https://www.patreon.com/robinsongz`);
                        }

                       
                        
                        
                    }
                    
                    else if (prop === 'info') {
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__Guild Fort Info__**`,
                                value: ` Buff Map: **${buffMap}** \nSkill Page 1: **${skillPage1User}** \nSkill Page 2: **${skillPage2User}** \nSkill Page 3: **${skillPage3User}** \nSkill Page 4: **${skillPage4User}** \nBuffer 1: **${buffer1}** \nBuffer 2: **${buffer2}** \nBuffer 3: **${buffer3}** `
                            },
                            ]
                        }
                    })
                    }
                    // guild fort tracker --

                    // adds + 1 to own gfb attendance
                    else if (prop === 'daily') {
                        gfTracker.inc(key, "points");
                        return message.reply(`+1 to your GFB attendance `)
                    }

                    // view own attendance count
                    else if (prop === 'track') {
                        const key = `${message.guild.id}-${message.author.id}`
                        return message.reply(`This week, you've done GFB ${gfTracker.get(key, "points")} times`)
                    }
                    
                    // view guild's attendance count
                    else if (prop === 'attd') {
                        const filtered = gfTracker.filter(p => p.guild === message.guild.id).array();

                        const sorted = filtered.sort((a,b) => b.points - a.points);

                      

                        const embedSorted = sorted.map(data => {
                            return `${bot.users.get(data.user).username} : ${data.points}\n`;
                        })

                       
                        const embed = new Discord.RichEmbed()
                            .addField("GFB Attendance Tracker", 
                            `${embedSorted.join(" ")}`)

                        return message.channel.send({embed});
                    }

                    // clear guild's attendance count
                    else if (prop === 'cleanup') {

                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("You're not an admin, sorry!");
                        }

                        const filtered = gfTracker.filter(p => p.guild === message.guild.id);

                        filtered.forEach(data => {
                            gfTracker.delete(`${message.guild.id}-${data.user}`);
                        });

                        message.channel.send(`You've cleared the GFB tracker`);
                    }

                    // set guild members attendance count
                    else if (prop === 'set') {
                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("You're not an admin, sorry!");
                        }
                        

                        const user = message.mentions.users.first() || bot.users.get(args[0]);

                        

                        if (!user) return message.reply("you must mention someone or give their id");

                        const pointsToAdd = parseInt(args[1], 10);
                        if (!pointsToAdd) return message.reply(`you didn't tell me what number to set it to`);

                        const key = `${message.guild.id}-${user.id}`;

                        gfTracker.ensure(key, {
                            user: user.id,
                            guild: message.guild.id,
                            points: 0
                        })

                        gfTracker.set(key, pointsToAdd, "points");

                        message.channel.send(`${user.tag} has been set to ${pointsToAdd} GFB completions`)
                    }
 
                    // gf help
                    else if (prop === 'help') {
                    
                        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                    
                        if(!message.member.roles.has(adminRole.id)) {

                            message.author.send({embed: {
                                color: 3447003,
                                fields: [{
                                    name: "**__Public Commands__**", 
                                    value: `**!gf checkin ** : check yourself into gf. \n **!gf checkout ** : remove yourself from gf  \n**!gf view** : view gf \n**!gf daily** : +1 to your gfb attd \n**!gf track** : view own gfb attd \n**!gf attd** : view guild's gfb attd \n**!gf info** : view GFB info`
                                }]
                                }
                            });

                            return message.reply(`Check your DM!`);
                        }

                        else {
                            message.author.send({embed: {
                                color: 3447003,
                                fields: [{
                                    name: "**__Public Commands__**",
                                    value: `**!gf checkin ** : check yourself into gf. \n **!gf checkout ** : remove yourself from gf  \n**!gf view** : view gf \n**!gf daily** : +1 to your gfb attd \n**!gf track** : view own gfb attd \n**!gf attd** : view guild's gfb attd \n**!gf info** : view GFB info `
                                },{
                                    name: `**__GM Commands Part 1__**`,
                                    value: `**!gf clear** : clears entire gf \n **!gf add <use>** : adds user to gf (**important**: user must be exact same spelling as their display name or else it will double register if user checks in themselves)`
                                },{
                                    name: `**__GM Commands Part 2__**`,
                                    value: `**!gf remove <number>** : removes member of that number from gf \n **!gf edit <name>** : edits gf's title`
                                },  {
                                    name: `**__GM Commands Part 3__**`,
                                    value: `**!gf set <number> <user> ** : sets user's gfb attd to number \n **!gf cleanup** : clear GFB attd \n **!gf assign <assignKey> <value>** : Sets assignment to value`
                                }
                                ]
                            }
                            });
                            
                            return message.reply(`Check your DM!`);
                        }
                    }
            
                    else {
                        return message.reply(`Please enter !gf help`);
                    }
        }

        else if (message.channel.name === gfChannel2) {
            let patreonRole = slimeServer.roles.get('592523621898125323').id;

            let gmRole = slimeServer.roles.get('519626665551200257').id;

            // mapping all members with patreon role into an array.
            let patreonMembers = slimeServer.roles.get(patreonRole).members.map(member => {
                return member.user.id;
            })

            let gmMembers = slimeServer.roles.get(gmRole).members.map(member => {
                return member.user.id;
            })
            
            // mapping all members from the message.guild into an array.
            let guildMember = message.guild.members.map(member => {
                return member.id;
            })
        
            // if at least 1 guild member is a patreon member
            const foundPatreon = patreonMembers.some(r => guildMember.includes(r));
            const foundGm = gmMembers.some(r => guildMember.includes(r))
            
            if (foundPatreon === true || foundGm === true) {
               // gf check-ins
        
               patreonGfTracker.ensure(key, {
                user: message.author.id,
                guild: message.guild.id,
                points: 0, 
            });

               const [ prop ] = args;
               let member = message.member.displayName;
               // variable for getting gf team from enmap
               let gf = enmap.get(message.guild.id, 'patreonGuildFort.team');
               let buffMap = enmap.get(message.guild.id, 'patreonGuildFort.buffMap');
               let skillPage1User = enmap.get(message.guild.id, 'patreonGuildFort.skillPage1User');
               let skillPage2User = enmap.get(message.guild.id, 'patreonGuildFort.skillPage2User');
               let skillPage3User = enmap.get(message.guild.id, 'patreonGuildFort.skillPage3User');
               let skillPage4User = enmap.get(message.guild.id, 'patreonGuildFort.skillPage4User');
               let buffer1 = enmap.get(message.guild.id, 'patreonGuildFort.buffer1');
               let buffer2 = enmap.get(message.guild.id, 'patreonGuildFort.buffer2');
               let buffer3 = enmap.get(message.guild.id, 'patreonGuildFort.buffer3');

               //variable for gf team
               let gfTeam = 'patreonGuildFort.team';
               //variable for gf name
               let gfName = 'patreonGuildFort.name';

               //function to push member into gf array
               const gfPush = (member, gf) => {
                   return enmap.push(message.guild.id, member, gf);
               };

               //function to remove member from gf
               const gfRemove = (member, gf) => {
                   return enmap.remove(message.guild.id, member, gf);
               };

               //function to set gf to whatever value
               const gfSet = (value, gf) => {
                   return enmap.set(message.guild.id, value, gf);
               };

               // if gf spot is undefined, replace with " "
               const gfList = (index, gfNumber) => {
                   return gfNumber[index] === undefined ? "-" : gfNumber[index];
               };

               //discord embed function
               const gfEmbed = (name, gfNumber) => {
                   return message.channel.send({embed: {
                       color: 3447003,
                       fields: [{
                           name: `**__${name}__**`,
                           value: ` 1. ${gfList(0, gfNumber)} \n2. ${gfList(1, gfNumber)} \n3. ${gfList(2, gfNumber)} \n4. ${gfList(3, gfNumber)} \n5. ${gfList(4, gfNumber)} \n6. ${gfList(5, gfNumber)} \n7. ${gfList(6, gfNumber)} \n8. ${gfList(7, gfNumber)} \n9. ${gfList(8, gfNumber)} \n10. ${gfList(9, gfNumber)} \n11. ${gfList(10, gfNumber)} \n12. ${gfList(11, gfNumber)} \n13. ${gfList(12, gfNumber)} \n14. ${gfList(13, gfNumber)} \n15. ${gfList(14, gfNumber)} \n16. ${gfList(15, gfNumber)} \n17. ${gfList(16, gfNumber)} \n18. ${gfList(17, gfNumber)} \n19. ${gfList(18, gfNumber)} \n20. ${gfList(19, gfNumber)}`
                       },
                       ]
                   }
                   });
               };

               //full gf variables
               let fullgf = !gf.includes(undefined) && gf.length === 20;
           

               //variables for if gf includes member
               let includesMember = gf.includes(member);
               
           
               //variables for getting gf names from enmap
               let name = enmap.get(message.guild.id, 'patreonGuildFort.name');

               // checking in
               if (prop === "checkin") {
               
                   const [ prop, value ] = args;

                   
                       // if gf 1 is full
                       if (fullgf) {

                           return message.reply('Guild Fort list is full!');
                       }

                       else if (gf.includes(member)) {
                           return message.reply(`You're already checked in!`);
                       }
               
                       else {
               
                           gfPush(member, gfTeam);
                       
                           message.reply(`you just checked in to ${name}.`);
                   
                           gfEmbed(name, gf);
                       } 
                }
               
               
               // checking out
               else if (prop === "checkout") {
               
           
                   if (includesMember) {

                   gfRemove(member, gfTeam);

                   message.reply(`you have been removed from ${name}`);

                   gfEmbed(name, gf);
                   }

                   else {
                       return message.reply(`You aren't checked in.`);
                   }

               }

               // removing member
               else if (prop === 'remove') {

                   const [prop, ...value] = args;

                   const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                   if(!adminRole) return message.reply("Administrator Role Not Found");
               
                   if(!message.member.roles.has(adminRole.id)) {
                       return message.reply("Hey, you're not the boss of me!");
                   }

                   let hi = gf[value-1];

                   if (isNaN(value)) {
                       return message.reply(`Please enter '!gf remove <number>'`);
                   }

                   else {

                       gfRemove(hi, gfTeam);

                       message.channel.send(`${hi} has been removed from ${name}`);

                       gfEmbed(name, gf);
                   }
                   
               }

               // adding member
               else if (prop === 'add') {

                   const [prop, ...value] = args;

                   const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                   if(!adminRole) return message.reply("Administrator Role Not Found");
               
                   if(!message.member.roles.has(adminRole.id)) {
                       return message.reply("Hey, you're not the boss of me!");
                   }


                   if (value) {
                       if (gf.includes(value.join(" "))) {
                           return message.reply(`${value.join(" ")} is already checked in to ${name}`);
                       }

                       else if (fullgf) {
                           return message.reply(`${name} is already full!`);
                       }
           
                       else {
                           message.channel.send(`${value.join(" ")} has been added to ${name}`);

                           gfPush(value.join(" "), gfTeam);
               
                           gfEmbed(name, gf);
                       }

                   }
                   
                   else {
                       return message.reply(`Please enter '!gf add <display name>`);
                   }
               }
       
           
               // clearing gfs
               else if (prop === "clear") {

                   const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                   if(!adminRole) return message.reply("Administrator Role Not Found");
               
                   if(!message.member.roles.has(adminRole.id)) {
                       return message.reply("You're not an admin, sorry!");
                   }

                       gfSet([], gfTeam);

                       return message.channel.send(`${name} has been cleared.`);
                   
               }

               // viewing gfs
               else if (prop === "view") {

                   enmap.ensure(message.guild.id, defaultSettings);

           
                   gfEmbed(name, gf);
               
               }


               // changing gf title

               else if (prop === 'edit') {

                   const [ prop, ...value ] = args;

                   const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                   if(!adminRole) return message.reply("Administrator Role Not Found");
               
               
                   if(!message.member.roles.has(adminRole.id)) {
                       return message.reply("Hey, you're not the boss of me!");
                   }

               
                       gfSet(value.join(" "), gfName);

                       return message.reply(`You have changed guild fort title to ${value.join(" ")}`);
       
               }

               // mentioning checked-in members

               else if (prop === 'mention') {

                   const [ prop, ...value ] = args;

                   // if user is null, replace with ""

                   const realUser = (user) => {
                       return user === null ? "" : user;
                   };

                       let user1 = message.guild.members.find(member => member.displayName == gf[0]);

                       let user2 = message.guild.members.find(member => member.displayName == gf[1]);

                       let user3 = message.guild.members.find(member => member.displayName == gf[2]);

                       let user4 = message.guild.members.find(member => member.displayName == gf[3]);

                       let user5 = message.guild.members.find(member => member.displayName == gf[4]);

                       let user6 = message.guild.members.find(member => member.displayName == gf[5]);

                       let user7 = message.guild.members.find(member => member.displayName == gf[6]);

                       let user8 = message.guild.members.find(member => member.displayName == gf[7]);

                       let user9 = message.guild.members.find(member => member.displayName == gf[8]);

                       let user10 = message.guild.members.find(member => member.displayName == gf[9]);

                       let user11 = message.guild.members.find(member => member.displayName == gf[10]);

                       let user12 = message.guild.members.find(member => member.displayName == gf[11]);

                       let user13 = message.guild.members.find(member => member.displayName == gf[12]);

                       let user14 = message.guild.members.find(member => member.displayName == gf[13]);

                       let user15 = message.guild.members.find(member => member.displayName == gf[14]);

                       let user16 = message.guild.members.find(member => member.displayName == gf[15]);

                       let user17 = message.guild.members.find(member => member.displayName == gf[16]);

                       let user18 = message.guild.members.find(member => member.displayName == gf[17]);

                       let user19 = message.guild.members.find(member => member.displayName == gf[18]);

                       let user20 = message.guild.members.find(member => member.displayName == gf[19]);

                   
                           
                       return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} ${realUser(user7)} ${realUser(user8)} ${realUser(user9)} ${realUser(user10)} ${realUser(user11)} ${realUser(user12)} ${realUser(user13)} ${realUser(user14)} ${realUser(user15)} ${realUser(user16)} ${realUser(user17)} ${realUser(user18)} ${realUser(user19)} ${realUser(user20)}  : \n ${value.join(" ")}`);
               }
               
               
               else if (prop === 'assign') {
                let patreonRole = slimeServer.roles.get('592523621898125323').id;

                let gmRole = slimeServer.roles.get('519626665551200257').id;
    
                // mapping all members with patreon role into an array.
                let patreonMembers = slimeServer.roles.get(patreonRole).members.map(member => {
                    return member.user.id;
                })
    
                let gmMembers = slimeServer.roles.get(gmRole).members.map(member => {
                    return member.user.id;
                })
            
                // if member is patron
                const foundPatreon = patreonMembers.includes(message.member.id);
                const foundGm = gmMembers.includes(message.member.id);

                if (foundGm === true || foundPatreon === true) {
                    let [ prop, firstValue, ...secondValue ] = args;

                    if (firstValue === 'buffMap') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.buffMap');

                        return message.channel.send(`You've set \`${secondValue.join(" ")}\` as the \`guild fort buff map\``);
                    }

                    if (firstValue === 'page1') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.skillPage1User');

                        return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 1 User\``);
                    }

                    if (firstValue === 'page2') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.skillPage2User');

                        return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 2 User\``);
                    }

                    if (firstValue === 'page3') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.skillPage3User');

                        return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 3 User\``);
                    }

                    if (firstValue === 'page4') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.skillPage4User');

                        return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`Skill Page 4 User\``);
                    }

                    if (firstValue === 'buffer1') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.buffer1');

                        return message.channel.send(`You've set \`${secondValue.join(" ")}\` as \`buffer 1\``);
                    }

                    if (firstValue === 'buffer2') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.buffer2');

                        return message.channel.send(`You've set ${secondValue.join(" ")} as \`buffer 2\``);
                    }

                    if (firstValue === 'buffer3') {
                        gfSet(secondValue.join(" "), 'patreonGuildFort.buffer3');

                        return message.channel.send(`You've set ${secondValue.join(" ")} as \`buffer 3\``);
                    }

                    if (firstValue === 'clear') {
                        gfSet("", 'patreonGuildFort.buffMap');
                        gfSet("", 'patreonGuildFort.skillPage1User');
                        gfSet("", 'patreonGuildFort.skillPage2User');
                        gfSet("", 'patreonGuildFort.skillPage3User');
                        gfSet("", 'patreonGuildFort.skillPage4User');
                        gfSet("", 'patreonGuildFort.buffer1');
                        gfSet("", 'patreonGuildFort.buffer2');
                        gfSet("", 'patreonGuildFort.buffer3');

                        return message.channel.send(`You have cleared your gfb assignments!`);
                    }
                    if (firstValue === 'help') {

                        message.reply(`Check your DM!`);

                        return message.author.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__GFB Assign Commands__**",
                                value: `**!gf assign buffMap <value>** \n**!gf assign page[#] <value>*** \n**!gf assign buffer[#] <value>***`
                            }]
                            }
                        });

                    }

                    else {
                        return message.channel.send('Please type `!gf assign help`');
                    }
                }

                else {
                    message.reply(`This command is limited to Patrons! Become a patron here: https://www.patreon.com/robinsongz`);
                }

               
                
                
                }
            
                else if (prop === 'info') {
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__Guild Fort Info__**`,
                        value: ` Buff Map: **${buffMap}** \nSkill Page 1: **${skillPage1User}** \nSkill Page 2: **${skillPage2User}** \nSkill Page 3: **${skillPage3User}** \nSkill Page 4: **${skillPage4User}** \nBuffer 1: **${buffer1}** \nBuffer 2: **${buffer2}** \nBuffer 3: **${buffer3}** `
                    },
                    ]
                }
            })
                }
                // guild fort tracker --

                // adds + 1 to own gfb attendance
                else if (prop === 'daily') {
                    patreonGfTracker.inc(key, "points");
                return message.reply(`+1 GFB attendance `)
                }

                // view own attendance count
                else if (prop === 'track') {
                    const key = `${message.guild.id}-${message.author.id}`
                    return message.reply(`This week, you've done GFB ${patreonGfTracker.get(key, "points")} times`)
                }
            
                // view guild's attendance count
                else if (prop === 'attd') {
                    const filtered = patreonGfTracker.filter(p => p.guild === message.guild.id).array();

                    const sorted = filtered.sort((a,b) => b.points - a.points);

                  

                    const embedSorted = sorted.map(data => {
                        return `${bot.users.get(data.user).username} : ${data.points}\n`;
                    })

                   
                    const embed = new Discord.RichEmbed()
                        .addField("GFB Attendance Tracker", 
                        `${embedSorted.join(" ")}`)

                    return message.channel.send({embed});
                }

                // clear guild's attendance count
                else if (prop === 'cleanup') {
                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                        if(!adminRole) return message.reply("Administrator Role Not Found");
                    
                        if(!message.member.roles.has(adminRole.id)) {
                            return message.reply("You're not an admin, sorry!");
                        }

                const filtered = patreonGfTracker.filter(p => p.guild === message.guild.id);

                filtered.forEach(data => {
                    patreonGfTracker.delete(`${message.guild.id}-${data.user}`);
                });

                message.channel.send(`You've cleared the GFB tracker`);
                }

                // set guild members attendance count
                else if (prop === 'set') {
                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                    if(!message.member.roles.has(adminRole.id)) {
                        return message.reply("You're not an admin, sorry!");
                    }

                    const user = message.mentions.users.first();

                    if (!user) return message.reply("You must mention someone!");

                    const pointsToAdd = parseInt(args[1], 10);
                    if (!pointsToAdd) return message.reply(`You didn't tell me what number to set it to`);

                    const key = `${message.guild.id}-${user.id}`;

                    patreonGfTracker.ensure(key, {
                        user: user.id, 
                        guild: message.guild.id,
                        points: 0
                    })

                    patreonGfTracker.set(key, pointsToAdd, "points");

                    message.channel.send(`${user.tag} has been set to ${pointsToAdd} GFB completions`)
                    }

                // gf help
                else if (prop === 'help') {
                
                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                
                    if(!message.member.roles.has(adminRole.id)) {

                        message.author.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Public Commands__**", 
                                value: `**!gf checkin ** : check yourself into gf. \n **!gf checkout ** : remove yourself from gf  \n**!gf view** : view gf \n**!gf daily** : +1 to your gfb attd \n**!gf track** : view own gfb attd \n**!gf attd** : view guild's gfb attd \n**!gf info** : view GFB info`
                            }]
                            }
                        });

                        return message.reply(`Check your DM!`);
                    }

                    else {
                        message.author.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Public Commands__**",
                                value: `**!gf checkin ** : check yourself into gf. \n **!gf checkout ** : remove yourself from gf  \n**!gf view** : view gf \n**!gf daily** : +1 to your gfb attd \n**!gf track** : view own gfb attd \n**!gf attd** : view guild's gfb attd \n**!gf info** : view GFB info `
                            },{
                                name: `**__GM Commands Part 1__**`,
                                value: `**!gf clear** : clears entire gf \n **!gf add <use>** : adds user to gf (**important**: user must be exact same spelling as their display name or else it will double register if user checks in themselves)`
                            },{
                                name: `**__GM Commands Part 2__**`,
                                value: `**!gf remove <number>** : removes member of that number from gf \n **!gf edit <name>** : edits gf's title`
                            },  {
                                name: `**__GM Commands Part 3__**`,
                                value: `**!gf set <number> <user> ** : sets user's gfb attd to number \n **!gf cleanup** : clear GFB attd \n **!gf assign <assignKey> <value>** : Sets assignment to value`
                            }
                            ]
                        }
                        });
                        
                        return message.reply(`Check your DM!`);
                    }
                }
        
                else {
                    return message.reply(`Please enter !gf help`);
                }  
            }

            else {
                message.reply(`None of your guild members are patreon members! Become a patron here: https://www.patreon.com/robinsongz`);
            } 
        }

        else {
            return message.channel.send('This command is not available in this channel. Please set your `gfChannel` or `gfChannel2` configuration.');
        }
    };



module.exports.help = {
    name: 'gf'
};
