const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

        let member = message.member.displayName;
        let gfChannel = enmap.get(message.guild.id, 'gfChannel');
         
        
    
    if (message.channel.name === gfChannel) {
        // gf check-ins
    
            const [ prop ] = args;

                // variable for getting gf team from enmap
                let gf = enmap.get(message.guild.id, 'guildFort.team')

                //variable for gf team
                let gfTeam = 'guildFort.team';
                //variable for gf name
                let gfName = 'guildFort.name';

                //function to push member into gf array
                const gfPush = (member, gf) => {
                    return enmap.push(message.guild.id, member, gf);
                }

                //function to remove member from gf
                const gfRemove = (member, gf) => {
                    return enmap.remove(message.guild.id, member, gf);
                }

                //function to set gf to whatever value
                const gfSet = (value, gf) => {
                    return enmap.set(message.guild.id, value, gf);
                }

                // if gf spot is undefined, replace with " "
                const gfList = (index, gfNumber) => {
                    return gfNumber[index] === undefined ? "-" : gfNumber[index];
                }

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
                    })
                }

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

                            return message.reply('Guild Fort list is full!')
                        }

                        else if (gf.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }
                
                        else {
                
                            gfPush(member, gfTeam);
                        
                            message.reply(`you just checked in to ${name}.`)
                    
                            gfEmbed(name, gf);
                        } 
                    }
                
                
                // checking out
                else if (prop === "checkout") {
                
            
                    if (includesMember) {

                       gfRemove(member, gfTeam);

                       message.reply(`you have been removed from ${name}`)

                       gfEmbed(name, gf);
                    }

                    else {
                        return message.reply(`You aren't checked in.`)
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
                        return message.reply(`Please enter '!gf remove <number>'`)
                    }

                    else {

                        gfRemove(hi, gfTeam);

                        message.channel.send(`${hi} has been removed from ${name}`)

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
                            return message.reply(`${value.join(" ")} is already checked in to ${name}`)
                        }

                        else if (fullgf) {
                            return message.reply(`${name} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${value.join(" ")} has been added to ${name}`)

                            gfPush(value.join(" "), gfTeam)
                
                            gfEmbed(name, gf);
                        }

                    }
                       
                    else {
                        return message.reply(`Please enter '!gf add <display name>`)
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

                        return message.channel.send(`${name} has been cleared.`)
                    
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

                        return message.reply(`You have changed guild fort title to ${value.join(" ")}`)
          
                }

                // mentioning checked-in members

                else if (prop === 'mention') {

                    const [ prop, ...value ] = args;

                    // if user is null, replace with ""

                    const realUser = (user) => {
                        return user === null ? "" : user;
                    }

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
                
                // gf help
                else if (prop === 'help') {
                
                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                
                    if(!message.member.roles.has(adminRole.id)) {

                        message.author.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Public Commands__**",
                                value: `**!gf checkin ** : check yourself into gf. \n **!gf checkout ** : remove yourself from gf  \n**!gf view** : view gf `
                            }]
                            }
                        })

                        return message.reply(`Check your DM!`)
                    }

                    else {
                        message.author.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Public Commands__**",
                                value: `**!gf checkin ** : check yourself into gf. \n **!gf checkout ** : remove yourself from gf  \n**!gf view** : view gf `
                            },{
                                name: `**__GM Commands Part 1__**`,
                                value: `**!gf clear** : clears entire gf \n **!gf add <user>** : adds user to gf (**important**: user must be exact same spelling as their display name or else it will double register if user checks in themselves)`
                            },{
                                name: `**__GM Commands Part 2__**`,
                                value: `**!gf remove <number>** : removes member of that number from gf \n **!gf edit <name>** : edits gf's title`
                            }
                            ]
                        }
                        })
                        
                        return message.reply(`Check your DM!`)
                    }
                }
        
                else {
                    return message.reply(`Please enter !gf help`)
                }
        }

        else {
            return message.channel.send('This command is not available in this channel. Please set your `gfChannel` configuration.')
        }
    }



module.exports.help = {
    name: 'gf'
}
