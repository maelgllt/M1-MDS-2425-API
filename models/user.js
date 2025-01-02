'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }

  User.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2 // pour le user
      }
  }, {
      sequelize,
      modelName: 'User',
  });

  return User;
};
