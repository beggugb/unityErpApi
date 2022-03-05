'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recibo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recibo.belongsTo(models.PlanPagos, {
        foreignKey: 'pagoId',
        as: 'pago',
      });
    }
  };
  Recibo.init({
    glosa: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    cliente: DataTypes.STRING,
    nit: DataTypes.STRING,
    pagoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recibo',
  });
  return Recibo;
};