const express = require('express');
const Discord = require('discord.js');
const config = require('./config.json');
const { getRandomImageId, getImageName } = require('./get-image');
const client = new Discord.Client();
const app = express();
const port = process.env.PORT || 6969;

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

    const image = getImageName(id);
    const attachment = new Discord.MessageAttachment(`./images/${image}`);

    if (!image) return message.channel.send(`Could not find an image matching ID #${id}`);

    const embed = new Discord.MessageEmbed()
      .attachFiles(attachment)
      .setImage(`attachment://${image}`);
    message.channel.send(embed);
  }
});

client.on('ready', () => {
  console.log('ready');
});

app.get('/', (req, res) => {
  const id = getRandomImageId();
  res.redirect(`/${id}`);
});

app.get('/:id', (req, res) => {
  const image = getImageName(req.params.id);
  if (image) {
    res.sendFile(`${__dirname}/images/${image}`);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
