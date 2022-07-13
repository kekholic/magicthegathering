const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const renderFrontHtml = require('../lib/renderFrontHtml');
const renderFrontToken = require('../lib/renderFrontToken');
const { failAuth } = require('../middlewares/func');

const Register = require('../views/Register');
const Login = require('../views/Login');
const CollectionList = require('../views/CollectionList');

const { User, Token } = require('../db/models');

exports.getRegistrationForm = (req, res) => {
  renderFrontHtml(Register, null, res);
};

exports.getLoginForm = (req, res) => {
  renderFrontHtml(Login, null, res);
};

exports.registration = async (req, res) => {
  const { name, login, password } = req.body;
  try {
    const candidate = await User.findOne({ where: { login } });
    if (candidate) return failAuth(res, { message: 'Имя пользователя занято' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      login,
      password: hashedPassword,
      lastSignin: new Date(),
    });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    const tokenData = await Token.findOne({ where: { userId: user.id } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    }
    const token = await Token.create({ refreshToken, userId: user.id });
    res.cookie('refreshToken', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    renderFrontToken(CollectionList, {
      login: user.login, id: user.id, accessToken, refreshToken,
    }, res);
    // req.session.user = { id: user.id, login: user.login };
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
    await user.save();

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    const tokenData = await Token.findOne({ where: { userId: user.id } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    }
    const token = await Token.create({ refreshToken, userId: user.id });
    res.cookie('refreshToken', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    renderFrontToken(CollectionList, {
      login: user.login, id: user.id, accessToken, refreshToken,
    }, res);

    // req.session.user = { id: user.id, login: user.login };
    // renderFrontHtml(CollectionList, { login }, res);
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
