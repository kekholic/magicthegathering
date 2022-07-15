const bcrypt = require('bcrypt');

const renderFront = require('../lib/renderFront');
const renderFrontWithId = require('../lib/renderFroinWithId');
const render = require('../lib/render');
const { failAuth } = require('../middlewares/func');

const RegisterFetch = require('../views/register/RegisterFetch');
const Register = require('../views/register/Register');
const LoginFetch = require('../views/register/LoginFetch');
const Login = require('../views/register/Login');
const HomeNavbar = require('../views/Navbar/HomeNavbar');
const HomeCollect = require('../views/Navbar/HomeCollect');

const { User, Collection } = require('../db/models');
const renderFetch = require('../lib/renderFetch');
const Collections = require('../views/users/Collections');

exports.getRegistrationFormFetch = (req, res) => {
  renderFront(RegisterFetch, null, res);
};

exports.getRegistrationForm = (req, res) => {
  render(Register, null, res);
};

exports.getLoginFormFetch = (req, res) => {
  renderFront(LoginFetch, null, res);
};

exports.getLoginForm = (req, res) => {
  render(Login, null, res);
};

exports.registration = async (req, res) => {
  const { name, login, password } = req.body;
  try {
    const candidate = await User.findOne({ where: { login } });
    if (candidate) return res.status(401).json({ message: 'Имя пользователя занято' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      login,
      password: hashedPassword,
      lastSignin: new Date(),
    });

    const userId = user.id;

    const collections = await Collection.findAll({ where: { userId }, order: [['id']] });

    req.session.user = { id: user.id, login: user.login };
    console.log('inside back', req.session);
    renderFrontWithId(HomeCollect, { id: user.id, collections }, res);
  } catch (error) {
    console.log('error: ', error.message);
    failAuth(res, { message: 'Ошибка регистрации. Повторите попытку.' });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (!user) return failAuth(res, 'Неверное имя или пароль!');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return failAuth(res, 'Неверное имя или пароль!!');

    user.lastSignin = new Date();
    user.save();

    const userId = user.id;

    const collections = await Collection.findAll({ where: { userId }, order: [['id']] });

    req.session.user = { id: user.id, login: user.login };

    return renderFrontWithId(HomeCollect, { login, id: user.id, collections }, res);
  } catch (error) {
    console.log('zashli 0000000000000000000000000000000');
    console.log('error: ', error.message);
    return failAuth(res, { message: 'Неудалось войти. Повторите попытку.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err.message);
      failAuth(res, 'Произошла ошибка. Повторите попытку');
    }
    res.clearCookie('sid');
    renderFetch(HomeNavbar, null, res);
  });
};
