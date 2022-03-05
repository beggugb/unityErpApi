'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlmacenItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      articuloId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Articulos',
            key: 'id',
            as: 'articuloId'
        }
      },
      almacenId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Almacens',
            key: 'id',
            as: 'alamcenId'
        }
      },
      stock: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('AlmacenItems');
  }
};