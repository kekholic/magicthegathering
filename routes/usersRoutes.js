const express = require('express');

const usersRoutes = express.Router();

const {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
} = require('../controller/usersRoutes');
// отрисовка страницы создания коллекции
usersRoutes.get('/:id/collections/:coll/new', showCollectionPage);

usersRoutes.get('/:id/collections/:coll/new/fetch', showCollectionPageFetch);
// создание новой таблицы и внесение её в дб
usersRoutes.post('/:id/collections/new', createNewCollection);
// отрисовка страницы со всеми коллекциями
usersRoutes.get('/:id/collections', showAllCollections);

module.exports = usersRoutes;
