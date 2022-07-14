const React = require('react');
const Layout = require('./Layout');

module.exports = function Home({ login }) {
  return (
    <Layout login={login}>

      <div className="card text-center">
        <img src="/images/firstPage.png" className="card-img-top" alt="FirstPageLogo" />
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <div className="buttons">
            <button type="button" id="go-register" className="btn btn-secondary btn-lg btn-first">Регистрация</button>
            <button type="button" id="go-login" className="btn btn-secondary btn-lg btn-first">Вход</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
