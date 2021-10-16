const { getImage, getImages, getLatestImage, getLatestImages, getRandomImage } = require('./get-image');
const putImage = require('./put-image');
const deleteImage = require('./delete-image');

module.exports = {
  getImage,
  getImages,
  getLatestImage,
  getLatestImages,
  getRandomImage,
  putImage,
  deleteImage
};
