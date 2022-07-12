const router = require('express').Router();

const renderFront = require('../lib/renderFront');
const Register = require('../views/Register');

// const { getHomePage } = require('../controllers/homeController');

router.get('/register', (req, res) => {
  renderFront(Register, null, res);
});

module.exports = router;
