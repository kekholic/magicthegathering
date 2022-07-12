exports.isValid = (req, res, next) => {
  const { name, login, password } = req.body;
  if (name && login && password) next();
  res.sendStatus(401);
};

exports.failAuth = (res, err) => res.status(401).json({ err });
