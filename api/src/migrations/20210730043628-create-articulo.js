'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      unidad: {
        type: Sequelize.STRING
      },
      precioCompra: {
        type: Sequelize.DECIMAL
      },
      precioVenta: {
        type: Sequelize.DECIMAL
      },
      porcentaje: {
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING
      },
      categoriaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Categoria',
            key: 'id',
            as: 'categoriaId'
        }
      },
      marcaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Marcas',
            key: 'id',
            as: 'marcaId'
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
    await queryInterface.dropTable('Articulos');
  }
};