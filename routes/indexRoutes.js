const router = require('express').Router();

const { redirectHomeController } = require('../controllers/indexController');

router.get('/', redirectHomeController);

module.exports = router;
