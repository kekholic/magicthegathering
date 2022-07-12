const NewCollection = require('../views/users/NewCollection');
const Collections = require('../views/users/Collections');
const NewCollectionFetch = require('../views/users/NewCollectionFETCH');

const { Collection } = require('../db/models');

const render = require('../lib/render');
const renderFetch = require('../lib/renderFetch');

const showCollectionPage = (req, res) => {
  render(NewCollection, {}, res);
};

const showAllCollections = (req, res) => {
  render(Collections, {}, res);
};

const createNewCollection = async (req, res) => {
  const { title, userId } = req.body;
  const newCollection = await Collection.create({ title, userId });
  res.json({ collectionId: newCollection.id });
};

const showCollectionPageFetch = (req, res) => {
  renderFetch(NewCollectionFetch, {}, res);
};

module.exports = {
  showCollectionPage,
  showAllCollections,
  createNewCollection,
  showCollectionPageFetch,
};
