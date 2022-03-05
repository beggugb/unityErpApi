'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CompraItems', {
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
      compraId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Compras',
            key: 'id',
            as: 'compraId'
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
    await queryInterface.dropTable('CompraItems');
  }
};