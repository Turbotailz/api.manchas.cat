require('dotenv').config();

const { env } = process;

// Update with your config settings if necessary
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : env.PSQL_HOST,
      user : env.PSQL_USER,
      password : env.PSQL_PASSWORD,
      database : env.PSQL_DATABASE,
      charset: env.PSQL_CHARSET
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host : env.PSQL_HOST,
      user : env.PSQL_USER,
      password : env.PSQL_PASSWORD,
      database : env.PSQL_DATABASE,
      charset: env.PSQL_CHARSET
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  }

};
