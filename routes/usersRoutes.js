const express = require('express');

const usersRoutes = express.Router();

const { isAuth } = require('../middlewares/func');

const {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
  createNewCardAndCiC,
} = require('../controller/usersRoutes');
// отрисовка страницы создания коллекции
usersRoutes.get('/:id/collections/:coll/new', showCollectionPage);

usersRoutes.post('/:id/collections/:coll/new', createNewCardAndCiC);

usersRoutes.get('/:id/collections/:coll/new/fetch', showCollectionPageFetch);
// создание новой таблицы и внесение её в дб
usersRoutes.post('/:id/collections/new', createNewCollection);
// отрисовка страницы со всеми коллекциями
usersRoutes.get('/:id/collections', isAuth, showAllCollections);

module.exports = usersRoutes;
