const React = require('react');

function CardInCollectionItem({ card }) {
  return (
    <div className="col">
      <div className="card">
        {card['Cards.accessible'] === 0 ? <img className="gray" data-card-id={`${card['Cards.id']}`} src={`${card['Cards.image']}`} alt="cardImage" />
          : <img className="notGray" data-card-id={`${card['Cards.id']}`} src={`${card['Cards.image']}`} alt="cardImage" />}
        <div className="not-used">
          <span className="card-text">Кол-во: {`${card['Cards.accessible']}`}</span>
          <span className="card-text"> Цена: {`${card['Cards.price']} USD`}</span>
        </div>
        <button className="incrementButton btn btn-secondary add-card-button2" type="button">Добавить</button>
      </div>
    </div>
  );
}

module.exports = CardInCollectionItem;
