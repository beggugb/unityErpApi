'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comprobante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comprobante.belongsTo(models.Compra, {
        foreignKey: 'compraId',
        as: 'compra',
      });
      Comprobante.belongsTo(models.Venta, {
        foreignKey: 'ventaId',
        as: 'venta',
      });
      Comprobante.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      Comprobante.hasMany(models.Asiento, {
        foreignKey: 'comprobanteId',
        as: 'asiento',
      });
    }
  };
  Comprobante.init({
    fechaComprobante: DataTypes.DATE,
    fechaCierre: DataTypes.DATE,
    tipoComprobante: DataTypes.STRING,
    estado: DataTypes.STRING,
    label: DataTypes.STRING,
    numComprobante: DataTypes.STRING,
    glosaComprobante: DataTypes.STRING,
    montoImpuesto: DataTypes.DECIMAL,
    montoSubtotal: DataTypes.DECIMAL,
    montoTotal: DataTypes.DECIMAL,
    gestion: DataTypes.STRING,
    tdc: DataTypes.DECIMAL,
    tDebe: DataTypes.DECIMAL,
    tHaber: DataTypes.DECIMAL,
    ventaId: DataTypes.INTEGER,
    compraId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    nCheque: DataTypes.STRING,
    nBanco: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comprobante',
  });
  return Comprobante;
};