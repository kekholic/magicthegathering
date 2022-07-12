const Collections = require('../views/users/Collections');

const render = require('../lib/render');

const showAllCollections = (req, res) => {
  render(Collections, {}, res);
};

module.exports = showAllCollections;
