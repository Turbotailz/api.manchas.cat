require('dotenv').config();

const { env } = process;

// Update with your config settings.
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

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
