const ReactDomServer = require('react-dom/server');
const React = require('react');

const render = (reactElement, { login, id, collections }, response) => {
  const reactEl = React.createElement(reactElement, { login, collections });
  const html = ReactDomServer.renderToStaticMarkup(reactEl);
  response.json({ html, id });
};

module.exports = render;
