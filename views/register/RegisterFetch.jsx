const React = require('react');

module.exports = function getRegisterForm() {
  return (
    <form>
      <div className="mb-3 fixContainer">
        <label htmlFor="inputNameRegister" className="form-label">Введите имя:</label>
        <input type="name" className="form-control" id="inputNameRegister" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3 fixContainer">
        <label htmlFor="inputLoginRegister" className="form-label">Введите логин:</label>
        <input type="login" className="form-control" id="inputLoginRegister" />
      </div>
      <div className="mb-3 fixContainer">
        <label htmlFor="inputPasswordRegister" className="form-label">Введите пароль:</label>
        <input type="password" className="form-control" id="inputPasswordRegister" />
      </div>
      <button type="submit" id="getRegister" className="btn btn-primary">Отправить</button>
    </form>
  );
};
