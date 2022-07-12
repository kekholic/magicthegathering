const React = require('react');

const Layout = require('../Layout');

module.exports = function NewCollection() {
  return (
    <Layout>
      <img src="/images/mtgLogo.png" alt="mtgLogo" />
      <div className="input-group mb-3">
        <input data-id-search="search-input" type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button data-id-button="search-button" className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
      </div>
      <div id="card-list" className="row row-cols-1 row-cols-md-4 g-4" />
    </Layout>
  );
};