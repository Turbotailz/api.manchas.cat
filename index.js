const express = require('express');
const Discord = require('discord.js');
const config = require('./config.json');
const { getImage } = require('./get-image');
const client = new Discord.Client();
const app = express();

client.login(config.discord_token);

client.on('message', message => {
  if (message.content.startsWith('!manchas')) {
    const args = message.content.split(' ');

    let id;

    if (args[1]) {
      const int = parseInt(args[1]);
      if (isNaN(int)) {
        return message.channel.send(`Invalid ID: ${args[1]} - must be an integer! uwu`);
      }
      id = int;
    }

    const image = getImage(id);

    if (!image) return message.channel.send(`Could not find an image matching ID #${id}`);

    const filename = image.attachment.split('/')[2];
    const embed = new Discord.MessageEmbed()
      .attachFiles(image)
      .setImage(`attachment://${filename}`);
    message.channel.send(embed);
  }
});

client.on('ready', () => {
  console.log('ready');
});

