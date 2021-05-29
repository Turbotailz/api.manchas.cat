const db = require('../../database');

let imageIds = [];

async function fetchImageIds() {
  try {
    const images = await db('images').select('id');
    imageIds = images.map(({ id }) => id);
    console.log(imageIds);
  } catch (error) {
    console.error(error);
  }
}

(async function initImageArray() {
  await fetchImageIds();
  setInterval(fetchImageIds, 300000);
})();

async function getImage(id) {
  return !isNaN(parseInt(id)) ? db('images').where({ id }).first() : null;
}

async function getImages(currentPage, sort) {
  return db('images').orderBy('created_at', sort).paginate({ currentPage });
}

async function getRandomImage() {
  const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
  return getImage(randomId);
}

async function getLatestImage() {
  return db('images').whereNotNull('taken_at').orderBy('taken_at', 'desc').first();
}

async function getLatestImages(currentPage, sort) {
  return db('images').whereNotNull('taken_at').orderBy('taken_at', sort).paginate({ currentPage });
}

module.exports = {
  getImage,
  getImages,
  getLatestImage,
  getLatestImages,
  getRandomImage,
};
