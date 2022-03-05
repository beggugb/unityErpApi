'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CuentaCorriente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CuentaCorriente.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente',
      });
    }
  };
  CuentaCorriente.init({
    clienteId: DataTypes.INTEGER,
    autorizacion: DataTypes.STRING,
    montoMaximo: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN,
    montoInicial: DataTypes.DECIMAL,
    montoAsignado: DataTypes.DECIMAL,
    montoPagado: DataTypes.DECIMAL,
    montoDiferencia: DataTypes.DECIMAL,
    montoTotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'CuentaCorriente',
  });
  return CuentaCorriente;
};