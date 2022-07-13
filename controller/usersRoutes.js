const NewCollection = require('../views/users/NewCollection');
const HomeCollect = require('../views/Navbar/HomeCollect');
// const Collections = require('../views/users/Collections');
const NewCollectionFetch = require('../views/users/NewCollectionFETCH');

const { Collection, Card, CardInCollection } = require('../db/models');

const render = require('../lib/render');
const renderFetch = require('../lib/renderFetch');
// отрисовываем страницу добавления карт в коллекцию
const showCollectionPage = (req, res) => {
  render(NewCollection, {}, res);
};
// отрисовываем страницу со всеми коллекциями (toDo: доделать)
const showAllCollections = (req, res) => {
  const name = req.session?.user;
  renderFetch(HomeCollect, { login: name }, res);
};
// создаем новую коллекцию и записываем в дб
const createNewCollection = async (req, res) => {
  const { title, userId } = req.body;
  const newCollection = await Collection.create({ title, userId });
  res.json({ collectionId: newCollection.id });
};
// отрисовываем страницу добавления карт в коллекцию с помощью фетча
const showCollectionPageFetch = (req, res) => {
  renderFetch(NewCollectionFetch, {}, res);
};
// создаем новую карточку, записываем её в дб и записываем в промежуточную таблицу CiC
const createNewCardAndCiC = async (req, res) => {
  const {
    collectionId,
    title,
    price,
    image,
  } = req.body;
  // записываем карточку в дб
  const card = await Card.create({ title, price, image });
  const cardId = card.id;
  // console.log(cardId);
  // записываем промежуточную таблицу
  await CardInCollection.create({ collectionId, cardId });
};

module.exports = {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
  createNewCardAndCiC,
};
