'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inventarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.STRING
      },
      fechaInventario: {
        type: Sequelize.DATE
      },
      tipo: {
        type: Sequelize.STRING
      },
      nroItems: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DECIMAL
      },
      observaciones: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
        }
      },
      ventaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Venta',
            key: 'id',
            as: 'ventaId'
        }
      },
      compraId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Compras',
            key: 'id',
            as: 'compraId'
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
    await queryInterface.dropTable('Inventarios');
  }
};