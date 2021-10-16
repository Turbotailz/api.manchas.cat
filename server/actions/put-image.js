const database = require('../../database');
const exifr = require('exifr');
const AWS = require('aws-sdk');
const { env } = process;
const FileType = require('file-type');
const randomString = require('crypto-random-string');
const sharp = require('sharp');

const imageSizes = {
  small: 200,
  medium: 800,
  large: 1600,
};

async function putImage(image, caption, knex) {
  const db = knex || database;

  let taken_at;

  try {
    const exif = await exifr.parse(image);
    if (exif) {
      taken_at = exif['DateTimeOriginal'];
    }
  } catch(e) {
    console.error(e);
  }

  const { mime: ContentType, ext } = await FileType.fromBuffer(image);

  const id = randomString({ length: 8, type: 'alphanumeric' });
  const sources = {};
  const s3 = new AWS.S3({
    accessKeyId: env.S3_KEY,
    secretAccessKey: env.S3_SECRET,
  });

  async function uploadToS3(size) {
    try {
      const Key = `${env.S3_IMAGE_DIR}${id}_${size}.${ext}`;
      const Body = await sharp(image).resize(imageSizes[size]).toBuffer();
      const data = await s3.upload({
        Bucket: env.S3_BUCKET,
        Key,
        Body,
        ContentType,
      }).promise();
      console.log(`Uploaded ${Key}`);
      console.log(data);

      sources[size] = env.CDN_HOST + Key;
    } catch (error) {
      console.error(error);
    }
  }

  await Promise.all(Object.keys(imageSizes).map(uploadToS3));

  const { small: source_small, medium: source_medium, large: source_large } = sources;

  try {
    const [ row ] = await db('images').insert({ id, source_small, source_medium, source_large, taken_at }).returning('*');
    return row;
  } catch (e) {
    console.error(e);
  }
}

module.exports = putImage;
