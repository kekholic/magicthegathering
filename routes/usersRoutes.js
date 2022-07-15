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
} = require('../controllers/usersRoutes');

usersRoutes.route('/:id/collections/:coll/new')
  // отрисовка страницы создания коллекции
  .get(showCollectionPage)
  // заполняем карту в бд
  .post(createNewCardAndCiC);

// отрисовка страницы создания коллекции с помощью фетча
usersRoutes.get('/:id/collections/:coll/new/fetch', showCollectionPageFetch);
// отрисовка страницы со всеми коллекциями
usersRoutes.get('/:id/collections/a', isAuth, showAllCollectionsFetch);

usersRoutes.get('/:id/collections', isAuth, showAllCollections);
// удаляем коллекцию из дб
usersRoutes.delete('/:id/collections/fetch', deleteCollection);
// отрисовываем страницу с картами данной коллекции
usersRoutes.get('/:id/collections/:coll', showCardsInOneCollection);

usersRoutes
  .route('/:id/collections/:coll/fetch')
  // отрисовываем страницу с картами данной коллекции с помощью фетча
  .get(showCardsInOneCollectionFetch)
  // изменяем количество имеющих карт в колоде
  .patch(patchCardInCollectionFetch);

// создание новой таблицы и внесение её в дб
usersRoutes.post('/:id/collections/new', createNewCollection);

// usersRoutes.get('/:id/collections/buttons', isAuth, showAllCollectionsFetch);

module.exports = usersRoutes;
