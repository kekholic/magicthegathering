const router = require('express').Router();

const { getHomePage } = require('../controllers/homeController');

router.get('/', getHomePage);

module.exports = router;
