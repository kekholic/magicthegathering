const React = require('react');

module.exports = function NewCollectionFetch() {
  return (
    <>
      <div className="input-group mb-3 fixCardInput">
        <input data-id-search="search-input" type="text" className="form-control" placeholder="Введите название карты" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button data-id-button="search-button" className="btn btn-outline-secondary fixCardInputbtn" type="button" id="button-addon2">Найти</button>
      </div>
      <button data-id-button="save-collection" className="btn btn-secondary btn-lg fixCardInputAdd" type="button">Сохранить и вернуться в коллекцию</button>
      <div id="card-list" className="row row-cols-1 row-cols-md-4 g-4" />
    </>
  );
};
