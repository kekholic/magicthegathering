const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CardInCollection extends Model {
    static associate(models) {
    }
  }
  CardInCollection.init({
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'CardInCollection',
  });
  return CardInCollection;
};
