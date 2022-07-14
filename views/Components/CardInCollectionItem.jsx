const React = require('react');

function CardInCollectionItem({ card }) {
  return (
    <div className="col">
      <div className="card">
        <span className="card-text">{`${card['Cards.accessible']}`}</span>
        <span className="card-text">{`${card['Cards.price']} USD`}</span>
        {card['Cards.accessible'] === 0 ? <img className="gray" data-card-id={`${card['Cards.id']}`} src={`${card['Cards.image']}`} alt="cardImage" />
          : <img className="notGray" data-card-id={`${card['Cards.id']}`} src={`${card['Cards.image']}`} alt="cardImage" />}
        <button className="incrementButton add-card-button" type="button">Добавить</button>
      </div>
    </div>
  );
}

module.exports = CardInCollectionItem;
