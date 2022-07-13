const router = require('express').Router();

const { getHomePage } = require('../controllers/homeController');
const { getHomePageCollect } = require('../controllers/homeControllerCollect');
const { getHomePageNavbar } = require('../controllers/homeControllerNavbar');

router.get('/', getHomePage);
router.get('/navbar', getHomePageNavbar);
router.get('/collect', getHomePageCollect);

module.exports = router;
