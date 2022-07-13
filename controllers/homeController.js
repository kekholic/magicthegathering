const render = require('../lib/render');

const Home = require('../views/Home');

exports.getHomePage = (req, res) => {
  const name = req.session?.user;
  render(Home, { login: name }, res);
};
