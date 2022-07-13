const ReactDomServer = require('react-dom/server');
const React = require('react');

const renderFrontHtml = (reactElement, properties, response) => {
  const reactEl = React.createElement(reactElement, properties);
  const html = ReactDomServer.renderToStaticMarkup(reactEl);
  response.json({ html });
};

module.exports = renderFrontHtml;
