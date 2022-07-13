const renderFetch = require('../lib/renderFetch');

const HomeNavbar = require('../views/Navbar/HomeNavbar');

// выход на главную страницу
exports.getHomePageNavbar = (req, res) => {
   const name = req.session?.user;
   renderFetch(HomeNavbar, { login: name }, res);
};