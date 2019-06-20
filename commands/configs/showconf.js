const Discord = require('discord.js');

module.exports.run = async (bot, message) => {

  const guildConf = enmap.ensure(message.guild.id, defaultSettings);

  if (!message.guild || message.author.bot) return;
  
  if (message.content.indexOf(guildConf.prefix) !== 0) return;
  
// shows current configuration

  const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
  if(!adminRole) return message.reply("Administrator Role Not Found");
  
  if(!message.member.roles.has(adminRole.id)) {
    return message.reply("You're not an admin, sorry!");
  }

  let configProps = Object.keys(guildConf)
    .filter(prop => {
      if (prop === 'team' || prop === 'guildFort' || prop === 'party' || prop === 'patreonTeam' || prop === 'patreonGuildFort') {
        return false;
      }
      return true;
    }).map(prop => {
      
      return `▶ ${prop} ▶  :  ${guildConf[prop]}\n\n`;
    });
  let configPropsJoin = configProps.join(" ");
  
  message.channel.send(`The following are the server's current configuration:
  \`\`\`${configPropsJoin}\`\`\``).catch(console.error);


};

module.exports.help = {
    name: "showconf"
};