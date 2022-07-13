const React = require('react');
const Layout = require('./Layout');

module.exports = function Home({ login }) {
  return (
    <Layout login={login} >
      <div className="card text-center">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <button type="button" id="go-register" className="btn btn-secondary btn-lg">Регистрация</button>
          <button type="button" id="go-login" className="btn btn-secondary btn-lg">Вход</button>
        </div>
        <div className="card-footer text-muted">
          2 days ago
        </div>
      </div>
    </Layout>
  );
};
