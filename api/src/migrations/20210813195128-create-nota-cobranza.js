'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NotaCobranzas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      montoTotal: {
        type: Sequelize.DECIMAL
      },
      pagoTotal: {
        type: Sequelize.DECIMAL
      },
      saldoTotal: {
        type: Sequelize.DECIMAL
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },      
      ventaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Venta',
            key: 'id',
            as: 'ventaId'
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
    await queryInterface.dropTable('NotaCobranzas');
  }
};