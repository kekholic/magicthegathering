const express = require('express');

const usersRoutes = express.Router();

const {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
  createNewCardAndCiC,
  showCardsInOneCollection,
  showCardsInOneCollectionFetch,
} = require('../controller/usersRoutes');
// отрисовка страницы создания коллекции
usersRoutes.get('/:id/collections/:coll/new', showCollectionPage);
// отрисовка страницы создания коллекции с помощью фетча
usersRoutes.get('/:id/collections/:coll/new/fetch', showCollectionPageFetch);
// отрисовка страницы со всеми коллекциями
usersRoutes.get('/:id/collections', showAllCollections);
// отрисовываем страницу с картами данной коллекции
usersRoutes.get('/:id/collections/:coll', showCardsInOneCollection);
// отрисовываем страницу с картами данной коллекции с помощью фетча
usersRoutes.get('/:id/collections/:coll/fetch', showCardsInOneCollectionFetch);

// заполняем карту в бд
usersRoutes.post('/:id/collections/:coll/new', createNewCardAndCiC);
// создание новой таблицы и внесение её в дб
usersRoutes.post('/:id/collections/new', createNewCollection);

module.exports = usersRoutes;
