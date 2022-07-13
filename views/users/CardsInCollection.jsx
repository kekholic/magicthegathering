const React = require('react');

const Layout = require('../Layout');

const CardInCollectionItem = require('../Components/CardInCollectionItem');

module.exports = function CardsInCollection({ cards }) {
  return (
    <Layout>
      {cards
      && cards.map((card) => (
        <CardInCollectionItem card={card} key={card.id} />
      ))}
    </Layout>
  );
};
