const React = require('react');

const Layout = require('../Layout');

module.exports = function NewCollection() {
  return (
    <Layout>
      <input type="text" data-id-input="create-input" />
      <button type="submit" data-id-button="create-button">Create!</button>
    </Layout>
  );
};
