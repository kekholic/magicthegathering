require('@babel/register');
require('dotenv').config();

const morgan = require('morgan');
const path = require('path');
const express = require('express');

const app = express();

// импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');

// импорт роутов
const indexRoutes = require('./routes/indexRoutes');
const usersRoutes = require('./routes/usersRoutes');
// const apiRoutes = require('./routes/apiRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// роутеры
app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  try {
    dbCheck();
    console.log(`Сервер запущен на http://localhost:${PORT} `);
  } catch (error) {
    console.log('Ошибка запуска сервера.', error.message);
  }
});
