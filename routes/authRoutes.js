const router = require('express').Router();

const { isValid } = require('../middlewares/func');

const {
  getRegistrationForm,
  getLoginForm,
  registration,
  login,
} = require('../controllers/authController');

router
  .route('/register')
  .get(getRegistrationForm)
  .post(isValid, registration);

router
  .route('/login')
  .get(getLoginForm)
  .post(login);

module.exports = router;
