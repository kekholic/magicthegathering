const NewCollection = require('../views/users/NewCollection');
const Collections = require('../views/users/Collections');
const NewCollectionFetch = require('../views/Components/NewCollectionFETCH');

const { Collection, Card, CardInCollection } = require('../db/models');

const render = require('../lib/render');
const renderFetch = require('../lib/renderFetch');
// отрисовываем страницу добавления карт в коллекцию
const showCollectionPage = (req, res) => {
  render(NewCollection, {}, res);
};
// отрисовываем страницу со всеми коллекциями (toDo: доделать)
const showAllCollections = async (req, res) => {
  const userId = req.session.user.id;
  const collections = await Collection.findAll({ where: { userId } });
  console.log(collections);
  render(Collections, { collections }, res);
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
  // записываем карточку в дб или ищем существующую
  const card = await Card.findOrCreate({ where: { title, price, image }, raw: true });

  const cardId = card[0].id;

  // записываем промежуточную таблицу
  await CardInCollection.create({ collectionId, cardId });
  const curretnCol = await Collection.findOne({ where: { id: collectionId } });
  curretnCol.count += 1;

  curretnCol.price = String(Number(curretnCol.price) + Number(price));
  await curretnCol.save();
  res.status(200).json();
};

module.exports = {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
  createNewCardAndCiC,
};
