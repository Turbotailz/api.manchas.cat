const db = require('../../database');

let imageIds = [];

const imageColumns = ['id', 'source_small', 'source_medium', 'source_large', 'taken_at'];

async function fetchImageIds() {
  try {
    const images = await db('images').select('id');
    imageIds = images.map(({ id }) => id);
  } catch (error) {
    console.error(error);
  }
}

(async function initImageArray() {
  await fetchImageIds();
  setInterval(fetchImageIds, 300000);
})();

async function getImage(id) {
  if (!id) return getRandomImage();
  if (id === 'latest') return getLatestImage();

  return db('images').select(imageColumns).where({ id }).first();
}

async function getImages(currentPage, sort) {
  return db('images').select(imageColumns).orderBy('created_at', sort).paginate({ currentPage, isLengthAware: true });
}

async function getRandomImage() {
  const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
  return getImage(randomId);
}

async function getLatestImage() {
  return db('images').select(imageColumns).whereNotNull('taken_at').orderBy('taken_at', 'desc').first();
}

async function getLatestImages(currentPage, sort) {
  return db('images').select(imageColumns).whereNotNull('taken_at').orderBy('taken_at', sort).paginate({ currentPage, isLengthAware: true });
}

module.exports = {
  getImage,
  getImages,
  getLatestImage,
  getLatestImages,
  getRandomImage,
};
