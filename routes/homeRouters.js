const router = require('express').Router();

const { getHomePage } = require('../controllers/homeController');
const { getHomePageCollect } = require('../controllers/homeControllerCollect');
const { getHomePageNavbar } = require('../controllers/homeControllerNavbar');

const { isAuth } = require('../middlewares/func');

router.get('/', getHomePage);
// router.get('/navbar', getHomePageNavbar);
// router.get('/collect', isAuth, getHomePageCollect);

module.exports = router;
