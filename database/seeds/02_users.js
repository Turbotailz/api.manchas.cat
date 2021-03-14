require('dotenv').config();

const { getHash } = require('../../util/password');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, email: 'sam.goodger@outlook.com', password: getHash('yeet') },
  ]);

};
