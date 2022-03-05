'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      to: {
        type: Sequelize.STRING
      },
      referencia: {
        type: Sequelize.STRING
      },
      detalle: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
        }
      },
      proveedorId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Proveedors',
            key: 'id',
            as: 'proveedorId'
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
    await queryInterface.dropTable('Mails');
  }
};