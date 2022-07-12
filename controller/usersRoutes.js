const NewCollection = require('../views/users/NewCollection');

const render = require('../lib/render');

const NewCollectionPage = (req, res) => {
  render(NewCollection, {}, res);
};

module.exports = NewCollectionPage;
