const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

exports.createTokens = (id, name) => {
  const payload = { id, name };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
};

exports.saveToken = async (id, refreshToken) => {
  const tokenData = await Token.findOne({ where: { userId: id } });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ refreshToken, userId: id });
};
