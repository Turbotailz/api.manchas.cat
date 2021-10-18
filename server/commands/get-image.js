const { DISCORD_COMMAND } = process.env;

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { getImage } = require('../actions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName(DISCORD_COMMAND)
    .setDescription('Replies with MEOW')
    .addStringOption(option => option.setName('id').setDescription('The ID of the image you want, or "latest"').setRequired(false)),
  async execute(interaction) {
    const id = interaction.options.getString('id');

    const image = await getImage(id);

    const embed = new MessageEmbed().setImage(image.source_medium).setFooter(`ID: ${image.id}\nTaken at: ${image.taken_at.split('T')[0]}`);

    await interaction.reply({ embeds: [ embed ]});
  }
};
