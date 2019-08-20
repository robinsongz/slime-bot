const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    if (!message.guild || message.author.bot) return;
  
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
    
    
        const fusing = (numberOfMaterials, materialCost, upgradeCost) => {
            return numberWithCommas(Math.round((numberOfMaterials * Number(materialCost))+ upgradeCost));
        };
        
        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        
        // forge stuff
        
    
            const botMessage = (typeOfMaterial, fuseMaterialCost, numberOfMaterials, materialCost, upgradeCost, fusingItem) => {
                message.reply(`Using ${typeOfMaterial} at ${numberWithCommas(fuseMaterialCost)} each, it will cost you ${fusing(numberOfMaterials, materialCost, upgradeCost)} mesos to max a ${fusingItem}!`)
                .catch(console.error);
            };
            let [ fuseItem, fuseMaterial, fuseMaterialCost, ] = args;
    
            // weapons
    
            if (fuseItem === 'mythicweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 146.44, fuseMaterialCost, 80542000, 'mythic weapon');
                
            }
            else if (fuseItem === 'mythicweapon' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
                botMessage('max uniques', fuseMaterialCost, 22.31, fuseMaterialCost, 41139640, 'mythic weapon');
                
            }
            else if (fuseItem ==='mythicweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 3864.13, fuseMaterialCost, 38641300, 'mythic weapon');
               
            }
           
            else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
               botMessage('max uniques', fuseMaterialCost, 9.23, fuseMaterialCost, 17024896, 'legendary weapon');
               
            }
            else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 60.6, fuseMaterialCost, 33328685, 'legendary weapon' );
                
            }
            else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 1598.95, fuseMaterialCost, 15989488, 'legendary weapon');
            }
           
            else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
                botMessage('max uniques', fuseMaterialCost, 3, fuseMaterialCost, 5529454, 'unique weapon' );
                
            }
            else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 19.68, fuseMaterialCost,  10824701, 'unique weapon');
                
            }
            else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 519.32, fuseMaterialCost, 5193167, 'unique weapon');
               
            }
    
            else if (fuseItem === 'epicweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 2.98, fuseMaterialCost, 1637948, 'epic weapon');
               
            }
            else if (fuseItem === 'epicweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 78.58, fuseMaterialCost, 785808, 'epic weapon');
            }
            
            // 
    
            // armors 
            else if (fuseItem === 'mythicarmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
                botMessage('max uniques', fuseMaterialCost, 17.16, fuseMaterialCost, 31643040, 'mythic armor');
                
            }
            else if (fuseItem === 'mythicarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 112.65, fuseMaterialCost, 61957500, 'mythic armor');
                
            }
            else if (fuseItem === 'mythicarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 2972.40, fuseMaterialCost, 29724000, 'mythic armor');
                
            }
            else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
                botMessage('max uniques', fuseMaterialCost, 7.10, fuseMaterialCost, 13096074, 'legendary armor');
                
            }
            else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 46.61, fuseMaterialCost, 25637450, 'legendaryarmor');
                
            }
            else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 1229.96, fuseMaterialCost, 12299606, 'legendary armor');
                
            }
            else if (fuseItem === 'uniquearmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
                botMessage('max uniques', fuseMaterialCost, 2.31, fuseMaterialCost, 4253426, 'unique armor');
                
            }
            else if (fuseItem === 'uniquearmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 15.14, fuseMaterialCost, 8326693, 'unique armor');
                
            }
            else if (fuseItem === 'uniquearmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 399.47, fuseMaterialCost, 3994744, 'unique armor');
              
            }
            else if (fuseItem === 'epicarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
                botMessage('max epics', fuseMaterialCost, 2.29, fuseMaterialCost, 1258426, 'epic armor');
                
            }
            else if (fuseItem === 'epicarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
                botMessage('level 1 epics', fuseMaterialCost, 60.37, fuseMaterialCost, 603732, 'epic armor');
                
            }
            //
    
            // fuse command help
            else if (fuseItem === 'help') {
                
                message.author.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Let me help you with fusing calculations!__**",
                        value: "1. Please type in !fuse followed by what you want to max (mythicweapon, legendaryweapon, uniquearmor, etc) \n \n 2. Follow that with your fusing material (maxepic, level1epic, maxunique) \n \n 3. Follow that with the cost of that fusing material (IE: 15000000, 10000000, etc) \n \n 4. Press Enter to find out your fusing cost! \n \n"
                      },
                      {
                        name: "**__Examples__**",
                        value: "!fuse legendaryweapon maxepic 15000000 \n\n !fuse mythicarmor level1epic 500000"
                      },
                      {
                          name: "**__Current Fusing Item Options__**",
                          value: "mythicweapon, legendaryweapon, uniqueweapon, epicweapon \n\n mythicarmor, legendaryarmor, uniquearmor, epicarmor \n\n"
                      },
                      {
                          name: "**__Current Fusing Material Options__**",
                          value: "maxunique, maxepic, level1epic"
                      },
                      {
                          name: "**__Other Fusing Commands__**",
                          value: "**!fuse data** : fusing data \n **!fuse treasure** : treasure pull data "
                      }
    
                    ],
                  }
                });
    
                message.reply(`Check your DM!`);
            }
            
            // fuse data
            else if (fuseItem === 'data') {
                message.reply({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Exp Required To Max__**",
                        value: "**Mythic Weapon**: 2,940,600 \n **Legendary Weapon**: 1,216,800 \n **Unique Weapon**: 395,200 \n **Epic Weapon**: 59,800 \n\n **Mythic Armor**: 2,262,000 \n **Legendary Armor**: 936,000 \n **Unique Armor**: 304,000 \n **Epic Armor**: 45,994"
                      },
                      {
                        name: "**__# of Max Uniques/Epics to Max__**",
                        value: "**Mythic Weapon**: 22.31 max uniques, 146.44 max epics \n **Legendary Weapon**: 9.23 max uniques, 60.6 max epics \n **Unique Weapon**: 3 max uniques, 19.68 max epics \n\n **Mythic Armor**: 17.16 max uniques, 112.65 max epics \n **Legendary Armor**: 7.1 max uniques, 46.61 max epics \n **Unique Armor**: 2.31 max uniques, 15.14 max epics"
                      },
                      {
                          name: "**__# of Epic Powders to Max__**",
                          value: "**ELvl 40 Mythic Weapon**: 10244.37 \n **Mythic Weapon**: 6182.17 \n **Legendary Weapon**: 2535.80 \n **Unique Weapon**: 823.59 \n **Epic Weapon**: 124.62 \n\n **Lvl 40 Mythic Armor**: 7880.28 \n **Mythic Armor**: 4713.98 \n **Legendary Armor**: 1950.61 \n **Unique Armor**: 633.53 \n **Epic Armor**: 95.85"
                      },
                      {
                        name: "**__# of Unique Powders to Max__**",
                        value: "**Lvl 40 Mythic Weapon**: 3016 \n **Mythic Weapon**: 1804.17 \n **Legendary Weapon**: 746.55 \n **Unique Weapon**: 242.47 \n **Epic Weapon**: 36.69 \n\n **Lvl 40 Mythic Armor**: 2320 \n **Mythic Armor**: 1387.82 \n **Legendary Armor**: 574.27 \n **Unique Armor**: 186.52 \n **Epic Armor**: 28.22"
                      }
                    ]
                  }
                });
            }
    
            // fuse treasure data
            else if (fuseItem === 'treasure') {
                message.reply({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Average Cost to max via treasure pulls__**",
                        value: "**Mythic Weapon**: 3.5b \n **Legendary Weapon**: 1.6b \n **Unique Weapon**: 520m \n **Epic Weapon**: 75m  \n\n **Mythic Armor**: 970m \n **Legendary Armor**: 400m \n **Unique Armor**: 130m \n **Epic Armor**: 18m"
                      },
                    ]
                  }
                });
            }
    
    
            // default
            else {
               message.reply(`Please enter !fuse help`)
               .catch(console.error);
            }
        };
module.exports.help = {
    name: 'fuse'
};