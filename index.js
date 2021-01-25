require('dotenv').config();

const express = require('express');
const Discord = require('discord.js');
const { getRandomImageId, getImageName } = require('./get-image');
const { DISCORD_TOKEN, PORT } = process.env;
const client = new Discord.Client();
const app = express();
const router = require('./routes');
const db = require('./database');

const { discordMessage, discordReady } = require('./events');

// Register Discord events
client.on('message', discordMessage);
client.on('ready', discordReady);

// Login to Discord client
client.login(DISCORD_TOKEN);

app.use(router);
// app.get('/', (req, res) => {
//   const id = getRandomImageId();
//   res.redirect(`/${id}`);
// });
//
// app.get('/:id', (req, res) => {
//   const image = getImageName(req.params.id);
//   if (image) {
//     res.sendFile(`${__dirname}/images/${image}`);
//   } else {
//     res.sendStatus(404);
//   }
// });

app.listen(PORT || 6969, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
