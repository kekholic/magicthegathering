const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Collection, Token }) {
      this.hasMany(Collection, { foreignKey: 'userId' });
      this.hasMany(Token, { foreignKey: 'userId' });
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
