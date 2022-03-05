'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventarioItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here      
      InventarioItem.belongsTo(models.Articulo, {
        foreignKey: 'articuloId',
        as: 'articulo',
      });
      InventarioItem.belongsTo(models.Inventario, {
        foreignKey: 'inventarioId',
        as: 'inventario',
      });
    }
  };
  InventarioItem.init({
    stock: DataTypes.INTEGER,
    codigo: DataTypes.STRING,    
    articuloId: DataTypes.INTEGER,
    inventarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InventarioItem',
  });
  return InventarioItem;
};