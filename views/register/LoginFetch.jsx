const React = require('react');

module.exports = function getLoginForm() {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="inputLoginLogin" className="form-label">Введите логин:</label>
        <input type="login" className="form-control" id="inputLoginLogin" />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPasswordLogin" className="form-label">Введите пароль:</label>
        <input type="password" className="form-control" id="inputPasswordLogin" />
      </div>
      <button type="submit" id="getLogin" className="btn btn-primary">Отправить</button>
    </form>
  );
};
