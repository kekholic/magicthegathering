const React = require('react');

const CardInCollectionItem = require('./CardInCollectionItem');

module.exports = function CardsInCollectionFetch({ allCards }) {
  return (
    <>
      <div id="card-list" className="row row-cols-1 row-cols-md-4 g-4">
        {allCards
    && allCards.map((card) => (
      <CardInCollectionItem card={card} key={card.id} />
    ))}
      </div>
      <button data-name="add-cards" type="button" className="btn btn-secondary btnAdd">Добавить новые карты</button>
    </>
  );
};
