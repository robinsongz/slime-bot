const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  const guildConf = enmap.ensure(message.guild.id, defaultSettings);

  if (!message.guild || message.author.bot) return;
  
  if (message.content.indexOf(guildConf.prefix) !== 0) return;

  if (args.length == 0) return message.channel.send("Please enter a valid prefix!");

  if (args.length > 1) return message.channel.send("Please enter only one prefix!");

  if (args[0].length > 1) return message.channel.send("Your selected prefix is too long, please use only 1 character!");

  guildConf.prefix = args;

  enmap.set(message.guild.id, guildConf);

  let botembed = new Discord.RichEmbed()
  .setTitle("Prefix changed!")
  .setDescription("Your prefix has been changed to `" + args + "`!")
  .setColor("#15f153")

  return message.channel.send(botembed);

}

module.exports.help = {
    name: "changeprefix"
}