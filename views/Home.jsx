const React = require('react');
const Layout = require('./Layout');

module.exports = function Home({ login }) {
  return (
    <Layout login={login}>

      <div className="card text-center">
        <img src="/images/firstPage.png" className="card-img-top" alt="FirstPageLogo" />
        <div className="card-body">
          <h3 className="card-title">Добро пожаловать в Magic: The Gathering Collections</h3>
          <p className="card-text">На нашем сайте вы можете собрать коллекцию интересующих вас карт для игры в Magic: The Gathering.
            Для доступа к функционалу сайта пройдите регистрацию, либо войдите в ваш аккаунт
          </p>
          <div className="buttons">
            <button type="button" id="go-register" className="btn btn-secondary btn-lg btn-first">Регистрация</button>
            <button type="button" id="go-login" className="btn btn-secondary btn-lg btn-first">Вход</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
