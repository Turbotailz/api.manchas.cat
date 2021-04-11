const db = require('../../database');

async function getImage(id) {
  return !isNaN(parseInt(id)) ? db('images').where({ id }).first() : null;
}

async function getImages(currentPage, sort) {
  return db('images').orderBy('created_at', sort).paginate({ currentPage });
}

async function getRandomImage() {
  const { rows } = await db.raw('SELECT * FROM images TABLESAMPLE SYSTEM_ROWS(1)');
  return rows[0];
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
