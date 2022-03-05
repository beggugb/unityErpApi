'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VentaItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      ventaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Venta',
            key: 'id',
            as: 'ventaId'
        }
      },
      articuloId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Articulos',
            key: 'id',
            as: 'articuloId'
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
    await queryInterface.dropTable('VentaItems');
  }
};