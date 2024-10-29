'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' }); // Un utilisateur appartient à un rôle
    }
  }

  User.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: { // Assurez-vous d'avoir un champ roleId
          type: DataTypes.INTEGER, // ou DataTypes.STRING selon votre définition de Role
          allowNull: false,
          defaultValue: 2 // Ou tout autre valeur qui correspond à 'user'
      }
  }, {
      sequelize,
      modelName: 'User',
  });

  return User;
};
