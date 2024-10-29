'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'roleId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Roles', // Nom de la table de référence
                key: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'roleId');
    }
};
