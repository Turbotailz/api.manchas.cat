require('dotenv').config();

const { getHash } = require('../../server/util/password');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    // uncomment the following line and add your own email/password
    // { id: 1, email: 'user@mail.com', password: getHash('hunter2') },
  ]);

};
