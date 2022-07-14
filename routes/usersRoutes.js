const express = require('express');

const usersRoutes = express.Router();

const { isAuth } = require('../middlewares/func');

const {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
  createNewCardAndCiC,
  showCardsInOneCollection,
  showCardsInOneCollectionFetch,
  deleteCollection,
  patchCardInCollectionFetch,
  showAllCollectionsFetch,
} = require('../controller/usersRoutes');
// отрисовка страницы создания коллекции
usersRoutes.get('/:id/collections/:coll/new', showCollectionPage);
// отрисовка страницы создания коллекции с помощью фетча
usersRoutes.get('/:id/collections/:coll/new/fetch', showCollectionPageFetch);
// отрисовка страницы со всеми коллекциями
usersRoutes.get('/:id/collections/a', isAuth, showAllCollectionsFetch);

usersRoutes.get('/:id/collections', isAuth, showAllCollections);
// удаляем коллекцию из дб
usersRoutes.delete('/:id/collections/fetch', deleteCollection);
// отрисовываем страницу с картами данной коллекции
usersRoutes.get('/:id/collections/:coll', showCardsInOneCollection);
// отрисовываем страницу с картами данной коллекции с помощью фетча
usersRoutes.get('/:id/collections/:coll/fetch', showCardsInOneCollectionFetch);
// изменяем количество имеющих карт в колоде
usersRoutes.patch('/:id/collections/:coll/fetch', patchCardInCollectionFetch);
// заполняем карту в бд
usersRoutes.post('/:id/collections/:coll/new', createNewCardAndCiC);
// создание новой таблицы и внесение её в дб
usersRoutes.post('/:id/collections/new', createNewCollection);

// usersRoutes.get('/:id/collections/buttons', isAuth, showAllCollectionsFetch);

module.exports = usersRoutes;
