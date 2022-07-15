const router = require('express').Router();

const { getIdUser } = require('../controllers/idController');

router.get('/', getIdUser);

module.exports = router;
