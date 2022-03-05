'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CuentaItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cuentaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'CuentaCorrientes',
            key: 'id',
            as: 'cuentaId'
        }
      },
      label: {
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
    await queryInterface.dropTable('CuentaItems');
  }
};