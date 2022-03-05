'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotaCobranza extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NotaCobranza.belongsTo(models.Venta, {
        foreignKey: 'ventaId',
        as: 'venta',
      });
      NotaCobranza.belongsTo(models.Compra, {
        foreignKey: 'compraId',
        as: 'compra',
      });
    }
  };
  NotaCobranza.init({
    nro: DataTypes.STRING,
    tipo: DataTypes.STRING,
    montoTotal: DataTypes.DECIMAL,
    pagoTotal: DataTypes.DECIMAL,
    saldoTotal: DataTypes.DECIMAL,
    fechaVencimiento: DataTypes.DATE,
    ventaId: DataTypes.INTEGER,
    compraId: DataTypes.INTEGER,
    cuotas: DataTypes.INTEGER,
    isVenta: DataTypes.BOOLEAN,
    detalle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NotaCobranza',
  });
  return NotaCobranza;
};