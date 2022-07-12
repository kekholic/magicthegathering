const express = require('express');

const app = express();
require('@babel/register');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const session = require('express-session');

// импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');
const sessionConfig = require('./lib/sessionConfig');

// импорт роутов
const indexRoutes = require('./routes/indexRoutes');
const homeRouters = require('./routes/homeRouters');
const authRoutes = require('./routes/authRoutes');

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

// роутеры
app.use('/', indexRoutes);
app.use('/home', homeRouters);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  try {
    dbCheck();
    console.log(`Сервер запущен на http://localhost:${PORT} `);
  } catch (error) {
    console.log('Ошибка запуска сервера.', error.message);
  }
});
