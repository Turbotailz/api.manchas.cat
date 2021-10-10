const db = require('../../database');

async function deleteImage(id) {
  return db('images').where({ id }).del();
}

module.exports = deleteImage;

