const router = require('express').Router();

const { isValid } = require('../middlewares/func');

const {
  getRegistrationForm,
  getLoginForm,
  registration,
  login,
  logout,
} = require('../controllers/authController');

router
  .route('/register')
  .get(getRegistrationForm)
  .post(isValid, registration);

router
  .route('/login')
  .get(getLoginForm)
  .post(login);

// router.get('/refresh')

router.get('/logout', logout);

module.exports = router;
