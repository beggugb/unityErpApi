'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlmacenItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AlmacenItem.belongsTo(models.Almacen, {
        foreignKey: 'almacenId',
        as: 'almacen',
      });
      AlmacenItem.belongsTo(models.Articulo, {
        foreignKey: 'articuloId',
        as: 'articulo',
      });
    }
  };
  AlmacenItem.init({
    almacenId: DataTypes.INTEGER,
    articuloId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AlmacenItem',
  });
  return AlmacenItem;
};