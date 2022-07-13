exports.isValid = (req, res, next) => {
  const { name, login, password } = req.body;
  // const isValidLogin = login.match(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i);
  // if (!isValidLogin) return res.status(401).json({ message: 'Недопустимый логин' });
  // const isValidPassword = password.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/);
  // if (!isValidPassword) return res.status(401).json({ message: 'Недопустимый пароль' });
  // if (name && isValidLogin && isValidPassword) return next();
  // return res.status(401).json({ message: 'Недопустимый логин или пароль' });
  if (name && login && password) return next();
  res.sendStatus(401);
};

exports.failAuth = (res, err) => res.status(401).json(err);

exports.isAuth = (req, res, next) => {
  if (req.session?.user) return next();
  return res.redirect('/auth/login');
};
