'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanPagos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlanPagos.belongsTo(models.NotaCobranza, {
        foreignKey: 'notaId',
        as: 'nota',
      });
    }
  };
  PlanPagos.init({
    cuota: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN,
    fechaPago: DataTypes.DATE,
    fechaPagado: DataTypes.DATE,
    notaId: DataTypes.INTEGER,
    mes:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlanPagos',
  });
  return PlanPagos;
};