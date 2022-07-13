const React = require('react');

function CardInCollectionItem({ card }) {
  return (
    <div className="col">
      <div className="card">
        <img src={`${card.image}`} alt="cardImage" />
      </div>
    </div>
  );
}

module.exports = CardInCollectionItem;
