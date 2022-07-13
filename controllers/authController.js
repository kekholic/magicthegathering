const bcrypt = require('bcrypt');

const renderFront = require('../lib/renderFront');
const { createTokens } = require('../lib/createToken');
const { failAuth } = require('../middlewares/func');

const Register = require('../views/Register');
const Login = require('../views/Login');
const CollectionList = require('../views/CollectionList');

const { User, Token } = require('../db/models');

exports.getRegistrationForm = (req, res) => {
  renderFront(Register, null, res);
};

exports.getLoginForm = (req, res) => {
  renderFront(Login, null, res);
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

    // const token = createTokens(user.id, user.name);

    req.session.user = { id: user.id, login: user.login };
    renderFront(CollectionList, { login }, res);
  } catch (error) {
    console.log('error: ', error.message);
    failAuth(res, { message: 'Ошибка регистрации. Повторите попытку.' });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (!user) failAuth(res, 'Неверное имя или пароль!');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) failAuth(res, 'Неверное имя или пароль!!');

    user.lastSignin = new Date();
    user.save();

    req.session.user = { id: user.id, login: user.login };
    renderFront(CollectionList, { login }, res);
  } catch (error) {
    console.log('error: ', error.message);
    failAuth(res, { message: 'Неудалось войти. Повторите попытку.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err.message);
      failAuth(res, 'Произошла ошибка. Повторите попытку');
    }
    res.clearCookie('sid');
    res.redirect('/');
  });
};
