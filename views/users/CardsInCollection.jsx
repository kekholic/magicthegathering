const React = require('react');

const Layout = require('../Layout');

const CardInCollectionItem = require('../Components/CardInCollectionItem');

module.exports = function CardsInCollection({ allCards, login }) {
  return (
    <Layout login={login}>
      <div id="card-list" className="row row-cols-1 row-cols-md-4 g-4">
        {allCards[0]['Cards.id']
      && allCards.map((card) => (
        <CardInCollectionItem card={card} key={card.id} />
      ))}
      </div>
      <button data-name="add-cards" type="button" className="btn btn-secondary btnAdd">Добавить новые карты</button>
    </Layout>
  );
};
