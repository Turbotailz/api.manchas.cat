const fs = require('fs');

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
  const filename = `M${attachmentId}.jpg`;
  if (fs.existsSync(`./images/${filename}`)) {
    return `M${attachmentId}.jpg`;
  }
  return null;
}

module.exports = {
  countImages,
  getRandomImageId,
  getImageName,
}
