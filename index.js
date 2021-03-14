require('dotenv').config();

const { ENVIRONMENT_DOMAIN, DISCORD_TOKEN, PORT, SECRET_TOKEN } = process.env;

const bodyParser = require('body-parser');
const cors = require('cors');
const Discord = require('discord.js');
const express = require('express');
const expressSession = require('express-session')({
  secret: SECRET_TOKEN,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
});
const morgan = require('morgan');
const passport = require('./util/passport');
const router = require('./routes');
const { discordMessage, discordReady } = require('./events');

const app = express();
const corsOptions = {
  origin: ENVIRONMENT_DOMAIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

app.use(morgan('dev'));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT || 6969, () => {
  console.log(`App started. Listening on http://localhost:${PORT}`);
});

const client = new Discord.Client();

// Register Discord events
client.on('message', discordMessage);
client.on('ready', discordReady);

// Login to Discord client
// client.login(DISCORD_TOKEN);