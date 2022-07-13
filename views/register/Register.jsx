const React = require('react');
const Layout = require('../Layout');

module.exports = function getRegisterForm() {
  return (
    <Layout>
      <form>
        <div className="mb-3">
          <label htmlFor="inputNameRegister" className="form-label">Введите имя:</label>
          <input type="name" className="form-control" id="inputNameRegister" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputLoginRegister" className="form-label">Введите логин:</label>
          <input type="login" className="form-control" id="inputLoginRegister" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPasswordRegister" className="form-label">Введите пароль:</label>
          <input type="password" className="form-control" id="inputPasswordRegister" />
        </div>
        <button type="submit" id="getRegister" className="btn btn-primary">Отправить</button>
      </form>
    </Layout>
  );
};
