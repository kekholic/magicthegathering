const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Collection, Token, Card }) {
      this.hasMany(Collection, { foreignKey: 'userId' });
      this.hasOne(Token, { foreignKey: 'userId' });
      this.hasMany(Card, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSignin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
