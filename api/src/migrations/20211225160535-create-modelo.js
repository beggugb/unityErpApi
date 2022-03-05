'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Modelos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.INTEGER
      },
      marcaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Marcas',
            key: 'id',
            as: 'marcaId'
        }
      },
      categoriaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Categoria',
            key: 'id',
            as: 'categoriaId'
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
    await queryInterface.dropTable('Modelos');
  }
};