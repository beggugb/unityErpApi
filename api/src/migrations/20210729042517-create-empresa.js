'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      registro: {
        type: Sequelize.STRING
      },
      smtpHost: {
        type: Sequelize.STRING
      },
      smtpUser: {
        type: Sequelize.STRING
      },
      smtpPassword: {
        type: Sequelize.STRING
      },
      smtpSecure: {
        type: Sequelize.STRING
      },
      smtpPort: {
        type: Sequelize.INTEGER
      },
      licencia: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Empresas');
  }
};