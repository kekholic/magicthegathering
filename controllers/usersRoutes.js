/* eslint-disable no-restricted-syntax */
const NewCollection = require('../views/users/NewCollection');

const Collections = require('../views/users/Collections');
const CardsInCollection = require('../views/users/CardsInCollection');

const NewCollectionFetch = require('../views/Components/NewCollectionFetch');
const CardsInCollectionFetch = require('../views/Components/CardsInCollectionFetch');

const HomeCollect = require('../views/Navbar/HomeCollect');
// const Collections = require('../views/users/Collections');

const { Collection, Card, CardInCollection } = require('../db/models');

const render = require('../lib/render');
const renderFetch = require('../lib/renderFetch');

/* -------------------------------------- */

// отрисовываем страницу добавления карт в коллекцию
const showCollectionPage = (req, res) => {
  const login = req.session?.user?.login;
  render(NewCollection, { login }, res);
};

// отрисовываем страницу добавления карт в коллекцию с помощью фетча
const showCollectionPageFetch = (req, res) => {
  renderFetch(NewCollectionFetch, {}, res);
};

// отрисовываем страницу со всеми коллекциями (toDo: доделать)
// ДЛЯ КНОПКИ В КОЛЛЕКЦИИ В ЛЕВОМ ВЕРХНЕМ УГЛУ
const showAllCollectionsFetch = async (req, res) => {
  const userId = req.session.user.id;
  const collections = await Collection.findAll({ where: { userId }, order: [['id']] });
  renderFetch(HomeCollect, { collections }, res);
};

/* -------------------------------------- */

// отрисовываем страницу со всеми коллекциями (toDo: доделать)
const showAllCollections = async (req, res) => {
  const login = req.session?.user?.login;
  const userId = req.session?.user?.id;
  const collections = await Collection.findAll({ where: { userId }, order: [['id']] });
  render(Collections, { collections, login }, res);
};

const deleteCollection = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  await Collection.destroy({ where: { id } });
  res.status(200).json();
};

/* -------------------------------------- */

// отрисовываем стринацу конкретной коллекции
const showCardsInOneCollection = async (req, res) => {
  const login = req.session?.user?.login;
  const collectionId = req.params.coll;
  const allCards = await Collection.findAll({
    order: [['id']],
    include: { model: Card },
    where: { id: collectionId },
    raw: true,
  });
  render(CardsInCollection, { allCards, login }, res);
};
// отрисовываем стринацу конкретной коллекции с помощью фетча
const showCardsInOneCollectionFetch = async (req, res) => {
  const collectionId = req.params.coll;
  const allCards = await Collection.findAll({
    order: [['id']],
    include: { model: Card },
    where: { id: collectionId },
    raw: true,
  });
  if (allCards[0]['Cards.id']) return renderFetch(CardsInCollectionFetch, { allCards }, res);
  return renderFetch(CardsInCollectionFetch, {}, res);
};

//

/* -------------------------------------- */

// создаем новую коллекцию и записываем в дб
const createNewCollection = async (req, res) => {
  const { title, userId } = req.body;
  const newCollection = await Collection.create({ title, userId });
  res.json({ collectionId: newCollection.id });
};
// создаем новую карточку, записываем её в дб и записываем в промежуточную таблицу CiC
const createNewCardAndCiC = async (req, res) => {
  const {
    collectionId,
    title,
    price,
    image,
  } = req.body;
  // записываем карточку в дб или ищем существующую
  const userId = req.session.user.id;
  const card = await Card.findOrCreate({
    where: {
      title,
      price,
      image,
      userId,
    },
    raw: true,
  });
  const cardId = card[0].id;
  const doWeHave = await CardInCollection.findOne({ where: { collectionId, cardId } });
  // записываем промежуточную таблицу
  if (!doWeHave) {
    const curretnCol = await Collection.findOne({ where: { id: collectionId } });
    curretnCol.allCount += 1;
    curretnCol.price = String((Number(curretnCol.price) + Number(price)).toFixed(2));
    if (card[0].accessible) {
      curretnCol.ownedCount += 1;
    }
    await curretnCol.save();
    await CardInCollection.create({ collectionId, cardId });
    res.status(200).json();
  } else {
    res.status(200).json();
  }
};

/* -------------------------------------- */

// меняем количество имеющихся карт
const patchCardInCollectionFetch = async (req, res) => {
  const { cardId, collectionId } = req.body;
  const card = await Card.findOne({ where: { id: cardId } });
  card.accessible += 1;
  await card.save();
  if (card.accessible === 1) {
    // eslint-disable-next-line max-len
    const allCollectionsUserSameCard = await Collection.findAll({ include: { model: Card, where: { title: card.title } }, where: { userId: req.session.user.id }, order: [['id']] });
    for (const collectionOne of allCollectionsUserSameCard) {
      collectionOne.ownedCount += 1;
      await collectionOne.save();
    }
    // if card in other collection same user then other collection owned count +1
  }
  return res.status(200).json(card.accessible);
};

module.exports = {
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
};
