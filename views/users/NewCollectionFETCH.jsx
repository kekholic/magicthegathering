const React = require('react');

module.exports = function NewCollectionFETCH() {
  return (
    <>
      <img src="/images/mtgLogo.png" alt="mtgLogo" />
      <div className="input-group mb-3">
        <input data-id-search="search-input" type="text" className="form-control" placeholder="Find the Magic" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button data-id-button="search-button" className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
      </div>
      <div id="card-list" className="row row-cols-1 row-cols-md-4 g-4" />
    </>
  );
};
