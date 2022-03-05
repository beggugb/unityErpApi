'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Almacens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      encargado: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      sucursalId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Sucursals',
            key: 'id',
            as: 'sucursalId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Almacens');
  }
};