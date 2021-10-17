require('dotenv').config();

const { ENVIRONMENT_DOMAIN, DISCORD_TOKEN, PORT, SECRET_TOKEN } = process.env;

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const morgan = require('morgan');

const passport = require('./util/passport');
const router = require('./routes');
const setupDiscordBot = require('./discord');

const app = express();

const corsOptions = {
  origin: ENVIRONMENT_DOMAIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

const maxAge = 24 * 60 * 60 * 1000;

app.use(morgan('dev'));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 }}));
app.use(session({
  secret: SECRET_TOKEN,
  cookie: { maxAge },
  store: new MemoryStore({ checkPeriod: maxAge }),
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT || 6969, () => {
  console.log(`App started. Listening on ${PORT}`);
});

// If you do not wish to use Discord features, simply leave DISCORD_TOKEN blank
if (DISCORD_TOKEN) {
  setupDiscordBot();
}
