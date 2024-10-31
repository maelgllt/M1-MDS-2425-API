'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId' }); // un rôle peut avoir plusieurs utilisateurs
    }
  }

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // rendre le nom unique
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};
