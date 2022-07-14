const React = require('react');

function Layout({ title, children, login }) {
  return (

    <html lang="ru">

      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" />
        <script defer src="/js/application.js" />
        <link rel="stylesheet" href="/css/style.css" />

        <title>{title || 'MTG Collections'}</title>
      </head>
      <body>
        <div className="wrapper">
          <header className="header">
            <nav className="navbar navbar-expand-lg bg-light">
              <div className="container-fluid">
                <span className="navbar-brand" id="getLogoutNavbar">Magic The Gathering</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active" id="getLogoutCollect" aria-current="page" href="/users/:id/collections">Мои коллекции</a>
                    </li>
                    {
                      login ? (
                        <li className="nav-item">
                          <a className="nav-link active" id="getLogout" style={{ hidden: "true" }} href="#">Выйти</a>
                        </li>
                      ) : (
                        <li className="nav-item">
                          <a className="nav-link active" id="getLogout" hidden="true" href="#">Выйти</a>
                        </li>
                      )
                    }
                  </ul>
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
            <div className="text-center p-3" style={{ backgroundColor: 'rgb(248, 249, 250)' }}>
              <p>Все права защищены</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

module.exports = Layout;
