'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompraItem.belongsTo(models.Compra, {
        foreignKey: 'compraId',
        as: 'compra',
      });
      CompraItem.belongsTo(models.Articulo, {
        foreignKey: 'articuloId',
        as: 'articulo',
      });
    }
  };
  CompraItem.init({
    cantidad: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    compraId: DataTypes.INTEGER,
    articuloId: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    categoria: DataTypes.STRING,
    marca: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompraItem',
  });
  return CompraItem;
};
