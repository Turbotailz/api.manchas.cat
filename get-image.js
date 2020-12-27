const fs = require('fs');
const Discord = require('discord.js');

function countImages() {
  return fs.readdirSync('./images').length;
}

function getRandomImageId() {
  const imageCount = countImages();
  return Math.floor(Math.random() * Math.floor(imageCount));
}

module.exports = {
  countImages,
  getRandomImageId,
  getImage(id) {
    if (id > countImages()) return null;
    let attachment;
    if (id) {
      attachment = new Discord.MessageAttachment(`./images/M${id}.jpg`);
    } else {
      const randomId = getRandomImageId();
      attachment = new Discord.MessageAttachment(`./images/M${randomId}.jpg`);
    }
    return attachment;
  }
}
