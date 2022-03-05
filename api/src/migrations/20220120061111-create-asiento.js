'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaAsiento: {
        type: Sequelize.DATE
      },
      glosaAsiento: {
        type: Sequelize.STRING
      },
      respaldo: {
        type: Sequelize.STRING
      },
      debe: {
        type: Sequelize.DECIMAL
      },
      haber: {
        type: Sequelize.DECIMAL
      },
      descripcion: {
        type: Sequelize.STRING
      },
      cc: {
        type: Sequelize.STRING
      },
      referencia: {
        type: Sequelize.STRING
      },
      auxiliar: {
        type: Sequelize.STRING
      },
      comprobanteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Comprobantes',
            key: 'id',
            as: 'comprobanteId'
        }
      },
      pucId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Pucs',
            key: 'id',
            as: 'pucId'
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
    await queryInterface.dropTable('Asientos');
  }
};