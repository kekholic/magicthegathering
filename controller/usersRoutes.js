const NewCollection = require('../views/users/NewCollection');
const Collections = require('../views/users/Collections');

const { Collection } = require('../db/models');

const render = require('../lib/render');

const showCollectionPage = (req, res) => {
  render(NewCollection, {}, res);
};

const showAllCollections = (req, res) => {
  render(Collections, {}, res);
};

const createNewCollection = async (req, res) => {
  const { title } = req.body;
  const newCollection = await Collection.create('')
};

module.exports = {
  showCollectionPage,
  showAllCollections,
};
