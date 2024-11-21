'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permissions', {
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',  // Associer à la table 'Roles'
          key: 'id',       // Clé primaire de la table 'Roles'
        },
        onDelete: 'CASCADE',  // Si un rôle est supprimé, supprimer les associations
        allowNull: false,
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permissions',  // Associer à la table 'Permissions'
          key: 'id',             // Clé primaire de la table 'Permissions'
        },
        onDelete: 'CASCADE',  // Si une permission est supprimée, supprimer l'association
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_permissions');
  }
};
