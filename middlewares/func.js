exports.isValid = (req, res, next) => {
  const { name, login, password } = req.body;
  const isValidLogin = login.match(/^[a-z0-9]+([-_]?[a-z0-9]+){2,}$/i);
  if (!isValidLogin) return res.status(401).json({ message: 'Недопустимый логин. Логин должен содержать более двух символов' });
  const isValidPassword = password.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/);
  if (!isValidPassword) return res.status(401).json({ message: 'Недопустимый пароль. Пароль должен содержать минимум 1 заглавную букву, 1 строчную, 1 цифру и кровь девственницы взятую в полнолуние. ' });
  if (name && isValidLogin && isValidPassword) return next();
  return res.status(401).json({ message: 'Недопустимый логин или пароль' });
  // if (name && login && password) return next();
  // res.sendStatus(401);
};

exports.failAuth = (res, err) => {
  console.log(err);
  return res.status(401).json({ err });
};

exports.isAuth = (req, res, next) => {
  if (req.session?.user) return next();
  return res.redirect('/auth/login');
};

exports.isCorrect = (req, res, next) => {
  if (req.session.user.id === req.params.id) return next();
  const message = 'Status 401: ошибка доступа';
  return res.status(401).json(message);
};
