const render = require('../lib/render');

const Home = require('../views/Home');

exports.getHomePage = (req, res) => {
  render(Home, null, res);
};
