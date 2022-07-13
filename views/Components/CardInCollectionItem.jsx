const React = require('react');

function CardInCollectionItem({ card }) {
  return (
    <div className="col">
      <div className="card">
        <p className="card-text">{`${card.ownedCount}`}</p>
        {card.ownedCount === 0 ? <img className="gray" data-card-id={`${card['Cards.id']}`} src={`${card['Cards.image']}`} alt="cardImage" />
          : <img className="notGray" data-card-id={`${card['Cards.id']}`} src={`${card['Cards.image']}`} alt="cardImage" />}
        <button className="incrementButton btn btn-light" type="button">add</button>
      </div>
    </div>
  );
}

module.exports = CardInCollectionItem;
