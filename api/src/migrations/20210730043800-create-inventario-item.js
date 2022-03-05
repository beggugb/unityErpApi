'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InventarioItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      almacenId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Almacens',
            key: 'id',
            as: 'almacenId'
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
      inventarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Inventarios',
            key: 'id',
            as: 'inventarioId'
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
    await queryInterface.dropTable('InventarioItems');
  }
};