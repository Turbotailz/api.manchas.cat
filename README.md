# api.manchas.cat

A ridiculously over-engineered API for my cat.

## Features

- CDN manager
- REST(ish) API to retrieve and add images
- Discord bot with commands

## Installation instructions

To run your own version of this API, you'll first need some things installed:

### Requirements
- [NodeJS](https://nodejs.org/) - at least version 16.6 with
- [KnexJS](https://knexjs.org/#Migrations-CLI) - for database migrations and seeding
- [PostgreSQL](https://www.postgresql.org/) - although MySQL may work as well (untested)
- [S3 bucket](https://aws.amazon.com/s3/) - to store the images
- Some seriously cute pics of your pet - uwu

### Optional
- [A Discord bot](https://discord.com/developers/docs/intro) - Only if you wish to make use of Discord features
- [Yarn](https://yarnpkg.com/) - But you can use NPM, knock yourself out
- [pm2](https://pm2.keymetrics.io/) - An amazing process manager which helps keep the application running forever, but you can use your own system if you need

### Installation steps

This guide assumes you have set up the above requirements. 

1. Clone this repository to somewhere you plan to run the API. Or download this repository as a .zip and extract it.

```bash
git clone https://github.com/Turbotailz/api.manchas.cat
```

2. Navigate to the application directory and install the dependencies with `yarn install` or `npm install`
3. Copy `.env.example` to `.env`
4. Edit `.env` with all the necessary information
5. Run the migration script to create the database tables 

```bash
knex migrate:latest
```
6. If you would like to bulk seed a set of prepared images, place them in the `database/seeds/images` folder
7. Edit `database/seeds/02_users.js` to include your own user (if you wish to enable POST and DELETE requests)
8. Run the seed command

```bash
knex seed:run
```
9. The application should be ready to start now

```bash
yarn start
# or
npm start
```

## Troubleshooting

You will likely run into issues trying to set this up. My installation guide was pretty brief because I am very lazy. Please do let me know in the issues section if you come across any problems, so I can document them here :)

## Contributing

Please do xo

Just make sure you run eslint before committing please!
