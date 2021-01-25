const db = require('../database');

module.exports = async (id) => {
  let image;

  if (id) {
    image = await db('images').where({ id }).first();
  } else {
    const { rows } = await db.raw('SELECT * FROM images TABLESAMPLE SYSTEM_ROWS(1)');
    image = rows[0];
  }

  return image;
}