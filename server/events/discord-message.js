const Discord = require('discord.js');
const { getImage } = require('../actions');

module.exports = async message => {
  if (message.content.startsWith(`!${process.env.DISCORD_COMMAND}`)) {
    const args = message.content.split(' ');

    let id;

    if (args[1]) {
      const int = parseInt(args[1]);
      if (isNaN(int)) {
        return message.channel.send(`Invalid ID: ${args[1]} - must be an integer! uwu`);
      }
      id = int;
    }

    const image = await getImage(id);

    console.log(image);
    const attachment = new Discord.MessageAttachment();

    if (!image) return message.channel.send(`Could not find an image matching ID #${id}`);

    const embed = new Discord.MessageEmbed()
      .attachFiles(attachment)
      .setImage(`attachment://${image}`);
    message.channel.send(embed);
  }
};
