'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
      });
      
      Role.hasMany(models.User, { foreignKey: 'roleId' });
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
