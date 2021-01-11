const fs = require('fs');
const Discord = require('discord.js');

function countImages() {
  return fs.readdirSync('./images').length;
}

function getRandomImageId() {
  const imageCount = countImages();
  return Math.floor(Math.random() * Math.floor(imageCount));
}

function getImageName(id) {
  if (id > countImages()) return null;
  const attachmentId = id ? id : getRandomImageId();
  return `M${attachmentId}.jpg`;
}

module.exports = {
  countImages,
  getRandomImageId,
  getImageName,
}
