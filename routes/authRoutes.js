const router = require('express').Router();

const { isValid } = require('../middlewares/func');

const {
  getRegistrationForm,
  getRegistrationFormFetch,
  getLoginForm,
  getLoginFormFetch,
  registration,
  login,
  logout,
} = require('../controllers/authController');

router
  .route('/register')
  .get(getRegistrationForm)
  .post(isValid, registration);

router.get('/register/fetch', getRegistrationFormFetch);

router
  .route('/login')
  .get(getLoginForm)
  .post(login);

router.get('/login/fetch', getLoginFormFetch);

router.get('/logout', logout);

// router.get('/refresh')

module.exports = router;
