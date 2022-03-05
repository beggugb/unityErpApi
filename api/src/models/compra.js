'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compra.belongsTo(models.Proveedor, {
        foreignKey: 'proveedorId',
        as: 'proveedor',
      });
      Compra.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      Compra.hasMany(models.NotaCobranza, {
        foreignKey: 'compraId',
        as: 'notacobranza',
      });
    }
  };
  Compra.init({
    nro: DataTypes.STRING,
    fechaCompra: DataTypes.DATE,
    tipo: DataTypes.STRING,
    nroItems: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    observaciones: DataTypes.STRING,
    estado: DataTypes.STRING,
    proveedorId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    proveedors: DataTypes.STRING,
    nroPagos: DataTypes.INTEGER,
    fechaAprobacion: DataTypes.DATE,
    gestion: DataTypes.INTEGER,
    mes: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};
