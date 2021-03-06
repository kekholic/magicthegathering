const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      this.belongsToMany(models.Collection, { through: models.CardInCollection, foreignKey: 'cardId', otherKey: 'collectionId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Card.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessible: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
