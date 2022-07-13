require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  name: 'sid',
  store: new FileStore({}),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
};

module.exports = sessionConfig;
