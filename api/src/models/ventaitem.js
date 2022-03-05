'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VentaItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VentaItem.belongsTo(models.Venta, {
        foreignKey: 'ventaId',
        as: 'venta',
      });
      VentaItem.belongsTo(models.Articulo, {
        foreignKey: 'articuloId',
        as: 'articulo',
      });
    }
  };
  VentaItem.init({
    cantidad: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    ventaId: DataTypes.INTEGER,
    articuloId: DataTypes.INTEGER,
    valor:DataTypes.NUMERIC,    
    categoria: DataTypes.STRING,
    marca: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VentaItem',
  });
  return VentaItem;
};
