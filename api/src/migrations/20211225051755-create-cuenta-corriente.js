'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CuentaCorrientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Clientes',
            key: 'id',
            as: 'clienteId'
        }
      },
      autorizacion: {
        type: Sequelize.STRING
      },
      montoMaximo: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      montoInicial: {
        type: Sequelize.DECIMAL
      },
      montoAsignado: {
        type: Sequelize.DECIMAL
      },
      montoPagado: {
        type: Sequelize.DECIMAL
      },
      montoDiferencia: {
        type: Sequelize.DECIMAL
      },
      montoTotal: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('CuentaCorrientes');
  }
};