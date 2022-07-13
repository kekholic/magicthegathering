const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Token.init({
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
