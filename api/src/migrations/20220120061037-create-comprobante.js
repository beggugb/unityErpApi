'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comprobantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaComprobante: {
        type: Sequelize.DATE
      },
      tipoComprobante: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      numComprobante: {
        type: Sequelize.STRING
      },
      glosaComprobante: {
        type: Sequelize.STRING
      },
      montoImpuesto: {
        type: Sequelize.DECIMAL
      },
      montoSubtotal: {
        type: Sequelize.DECIMAL
      },
      montoTotal: {
        type: Sequelize.DECIMAL
      },
      gestion: {
        type: Sequelize.STRING
      },
      tdc: {
        type: Sequelize.DECIMAL
      },
      tDebe: {
        type: Sequelize.DECIMAL
      },
      tHaber: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Comprobantes');
  }
};