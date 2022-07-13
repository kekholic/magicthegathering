const ReactDomServer = require('react-dom/server');
const React = require('react');

const renderFrontToken = (reactElement, {
  login, id, refreshToken, accessToken,
}, response) => {
  const reactEl = React.createElement(reactElement, { login });
  const html = ReactDomServer.renderToStaticMarkup(reactEl);
  response.json({
    html, id, refreshToken, accessToken,
  });
};

module.exports = renderFrontToken;
