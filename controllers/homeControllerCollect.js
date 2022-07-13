const renderFetch = require('../lib/renderFetch');

const HomeCollect = require('../views/Navbar/HomeCollect');

// выход на главную страницу
exports.getHomePageCollect = (req, res) => {
   const name = req.session?.user;
   renderFetch(HomeCollect, { login: name }, res);
};