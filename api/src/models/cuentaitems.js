'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CuentaItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CuentaItems.belongsTo(models.CuentaCorriente, {
        foreignKey: 'cuentaId',
        as: 'cuenta',
      });
    }
  };
  CuentaItems.init({
    cuentaId: DataTypes.INTEGER,
    label: DataTypes.STRING,
    montoMaximo: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN,
    montoInicial: DataTypes.DECIMAL,
    montoAsignado: DataTypes.DECIMAL,
    montoPagado: DataTypes.DECIMAL,
    montoDiferencia: DataTypes.DECIMAL,
    montoTotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'CuentaItems',
  });
  return CuentaItems;
};