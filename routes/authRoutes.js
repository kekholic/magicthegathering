const router = require('express').Router();
const bcrypt = require('bcrypt');

const renderFront = require('../lib/renderFront');
const Register = require('../views/Register');
const Login = require('../views/Login');
const CollectionList = require('../views/CollectionList')

const { User } = require('../db/models')

// const { getHomePage } = require('../controllers/homeController');

router.get('/register', (req, res) => {
  renderFront(Register, null, res);
});

router.get('/login', (req, res) => {
  renderFront(Login, null, res);
});

router.post('/login', async (req, res) => {
  const { name, login, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      login,
      password: hashedPassword,
      lastSignin: new Date()
    })
    req.session.user = { id: user.id, login: user.login };
    renderFront(CollectionList, { login }, res);
  } catch (error) {
    console.log("🚀 ~ file: authRoutes.js ~ line 22 ~ router.post ~ error", error)
  }
});

module.exports = router;
