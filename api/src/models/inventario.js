'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventario.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      Inventario.belongsTo(models.Compra, {
        foreignKey: 'compraId',
        as: 'compra',
      });
      Inventario.belongsTo(models.Venta, {
        foreignKey: 'ventaId',
        as: 'venta',
      });
      Inventario.belongsTo(models.Almacen, {
        foreignKey: 'almacenorigenId',
        as: 'aorigen',
      });
      Inventario.belongsTo(models.Almacen, {
        foreignKey: 'almacendestinoId',
        as: 'adestino',
      });
    }
  };
  Inventario.init({
    nro: DataTypes.STRING,
    fechaInventario: DataTypes.DATE,
    tipo: DataTypes.STRING,
    nroItems: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    observaciones: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    almacenorigenId: DataTypes.INTEGER,
    almacendestinoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    compraId: DataTypes.INTEGER,
    ventaId: DataTypes.INTEGER,
    registro: DataTypes.DATE	  
  }, {
    sequelize,
    modelName: 'Inventario',
  });
  return Inventario;
};
