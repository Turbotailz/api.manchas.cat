/* HOW TO BULK LOAD IMAGES
 * Simply place images in the "images" folder to seed them
 * The order images are uploaded cannot be guaranteed because of how Promise.all() works
 * For best results, make sure your images have the metadata "DateTimeOriginal"
 */

const fs = require('fs');
const { putImage } = require('../../server/actions');
const filePath = __dirname + '/images/';
const images = fs.readdirSync(filePath);

exports.seed = async knex => {
  // Deletes ALL existing entries
  console.log('Deleting all image records...');
  await knex('images').del();
  console.log('Done');

  // Inserts images into the database
  console.log('Inserting images to database...');
  const promises = [];

  for (const image of images) {
    const buffer = fs.readFileSync(filePath + image);
    promises.push(putImage(buffer, null, knex));
  }

  console.log('Done');

  return Promise.all(promises).then(() => {
    console.log('Done');
  });
};
