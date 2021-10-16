const { scryptSync } = require('crypto');
const { SECRET_TOKEN } = process.env;

const getHash = (password) => scryptSync(password, SECRET_TOKEN, 32).toString('hex');

module.exports = {
  getHash
};