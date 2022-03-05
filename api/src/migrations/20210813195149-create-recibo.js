'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recibos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      glosa: {
        type: Sequelize.STRING
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      cliente: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },      
      pagoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'PlanPagos',
            key: 'id',
            as: 'pagoId'
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
    await queryInterface.dropTable('Recibos');
  }
};