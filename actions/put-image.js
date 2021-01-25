const database = require('../database');
const exifr = require('exifr');
const AWS = require('aws-sdk');
const { env } = process;
const FileType = require('file-type');

async function putImage(filename, image, caption, knex) {
  const db = knex || database;

  let taken_at;

  try {
    const exif = await exifr.parse(image);
    if (exif) {
      taken_at = exif['DateTimeOriginal']
    }
  } catch(e) {
    console.error(e);
  }

  const endpoint = new AWS.Endpoint(env.S3_ENDPOINT);
  const s3 = new AWS.S3({
    endpoint,
    accessKeyId: env.S3_KEY,
    secretAccessKey: env.S3_SECRET,
    region: env.S3_REGION
  });

  const { mime: ContentType } = await FileType.fromBuffer(image);
  const Key = env.S3_IMAGE_DIR + filename;

  try {
    const data = await s3.upload({
      Key,
      Bucket: env.S3_BUCKET,
      Body: image,
      ACL: 'public-read',
      ContentType,
    }).promise();
    console.log(`Uploaded ${Key}`);
    console.log(data);

    const source = env.CDN_HOST + Key;
    return db('images').insert({ source, caption, taken_at });
  } catch (e) {
    console.error(e);
  }
}

module.exports = putImage;