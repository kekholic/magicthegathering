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
  render(NewCollection, {}, res);
};

// отрисовываем страницу добавления карт в коллекцию с помощью фетча
const showCollectionPageFetch = (req, res) => {
  renderFetch(NewCollectionFetch, {}, res);
};

// отрисовываем страницу со всеми коллекциями (toDo: доделать)
// ДЛЯ КНОПКИ В КОЛЛЕКЦИИ В ЛЕВОМ ВЕРХНЕМ УГЛУ
const showAllCollectionsFetch = async (req, res) => {
  const name = req.session?.user;
  const userId = req.session.user.id;
  const collections = await Collection.findAll({ where: { userId }, order: [['id']] });
  renderFetch(HomeCollect, { login: name }, res);
};

/* -------------------------------------- */

// отрисовываем страницу со всеми коллекциями (toDo: доделать)
const showAllCollections = async (req, res) => {
  const userId = req.session.user.id;
  const collections = await Collection.findAll({ where: { userId }, order: [['id']] });
  render(Collections, { collections }, res);
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
  const collectionId = req.params.coll;
  const allCards = await Collection.findAll({
    order: [['id']],
    include: { model: Card },
    where: { id: collectionId },
    raw: true,
  });
  render(CardsInCollection, { allCards }, res);
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
  const userId = req.session.user.id;
  // записываем карточку в дб или ищем существующую
  const card = await Card.findOrCreate({
    where: {
      title, price, image, userId,
    },
    raw: true,
  });
  const cardId = card[0].id;
  const doWeHave = await CardInCollection.findOne({ where: { collectionId, cardId } });
  // записываем промежуточную таблицу
  if (!doWeHave) {
    await CardInCollection.create({ collectionId, cardId });
    const curretnCol = await Collection.findOne({ where: { id: collectionId } });
    curretnCol.allCount += 1;
    curretnCol.price = String((Number(curretnCol.price) + Number(price)).toFixed(2));
    await curretnCol.save();
    res.status(200).json();
  } else {
    res.status(200).json();
  }
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
};
