const React = require('react');

function Layout({ title, children, login }) {
  return (

    <html lang="ru">

      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" />
        <script defer src="/js/application.js" />
        <link rel="stylesheet" href="/css/style.css" />

        <title>{title || 'ReactSSR'}</title>
      </head>
      <body>

        <header className="header">
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" id="getLogoutNavbar" href="#">MTG</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" id="getLogoutCollect" aria-current="page" href="/users/:id/collections">Коллекции</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" id="getLogout" hidden href="#">Выйти</a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Поиск</button>
                </form>
              </div>
            </div>
          </nav>
        </header>

        <main className="main">
          <div className="container">
            {children}
          </div>
        </main>

        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2020 Copyright:
            <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
          </div>
        </footer>

      </body>
    </html>
  );
}

module.exports = Layout;
