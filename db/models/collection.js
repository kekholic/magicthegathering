const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate({ User, Card }) {
      this.belongsTo(User);
      this.belongsToMany(Card, { through: 'CardInCollection', foreignKey: 'collectionId' });
    }
  }
  Collection.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};
