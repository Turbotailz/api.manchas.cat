const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID, NODE_ENV } = process.env;

const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');

const { discordReady, discordInteraction } = require('./events');

module.exports = async () => {
  try {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

    client.commands = new Collection();
    const commandsPath = path.join(__dirname, './commands/');
    const commands = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')).map(file => require(commandsPath + file));

    for (const command of commands) {
      client.commands.set(command.data.name, command);
    }

    // Register Discord events
    client.on('ready', discordReady);
    client.on('interactionCreate', discordInteraction);

    // Login to Discord client
    await client.login(DISCORD_TOKEN);

    console.log('Discord client logged in');

    // Setup commands
    const rest = new REST({ version: '9'}).setToken(DISCORD_TOKEN);
    const body = commands.map(command => command.data.toJSON());
    const route = NODE_ENV === 'production' ?
      Routes.applicationCommands(DISCORD_CLIENT_ID) :
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID);

    await rest.put(route, { body });
    console.log('Successfully registered Discord commands');
  } catch (error) {
    console.error(error);
  }
};
