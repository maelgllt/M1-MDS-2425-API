'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajout de la contrainte de clé étrangère
    await queryInterface.addConstraint('users', {
      fields: ['roleId'], // La colonne de la table users
      type: 'foreign key', // Le type de contrainte
      name: 'fk_role_id', // Nom donné à la contrainte
      references: {
        table: 'roles', // Table de référence
        field: 'id',    // Colonne référencée dans la table roles
      },
      onDelete: 'SET NULL', // Action si l'enregistrement dans roles est supprimé
      onUpdate: 'CASCADE',  // Action si l'enregistrement dans roles est mis à jour
    });
  },

  async down(queryInterface, Sequelize) {
    // Suppression de la contrainte lors d'un rollback
    await queryInterface.removeConstraint('users', 'fk_role_id');
  }
};
