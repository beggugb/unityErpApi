'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cajas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      montoInicial: {
        type: Sequelize.DECIMAL
      },
      montoEgreso: {
        type: Sequelize.DECIMAL
      },
      montoIngreso: {
        type: Sequelize.DECIMAL
      },
      montoFinal: {
        type: Sequelize.DECIMAL
      },
      fechaCierra: {
        type: Sequelize.DATE
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
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
    await queryInterface.dropTable('Cajas');
  }
};