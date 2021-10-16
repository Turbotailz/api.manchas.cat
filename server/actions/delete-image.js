const db = require('../../database');

async function deleteImage(id) {
  // TODO: Delete the image from S3 as well

  return db('images').where({ id }).del();
}

module.exports = deleteImage;

