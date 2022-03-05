'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReciboItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReciboItem.belongsTo(models.Recibo, {
        foreignKey: 'reciboId',
        as: 'recibo',
      });
    }
  };
  ReciboItem.init({
    articulo: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    reciboId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReciboItem',
  });
  return ReciboItem;
};