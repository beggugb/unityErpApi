'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asiento.belongsTo(models.Comprobante, {
        foreignKey: 'comprobanteId',
        as: 'comprobante',
      });
      Asiento.belongsTo(models.Puc, {
        foreignKey: 'pucId',
        as: 'puc',
      });
    }
  };
  Asiento.init({
    fechaAsiento: DataTypes.DATE,
    glosaAsiento: DataTypes.STRING,
    respaldo: DataTypes.STRING,
    debe: DataTypes.DECIMAL,
    haber: DataTypes.DECIMAL,
    descripcion: DataTypes.STRING,
    cc: DataTypes.STRING,
    referencia: DataTypes.STRING,
    auxiliar: DataTypes.STRING,
    comprobanteId: DataTypes.INTEGER,
    pucId: DataTypes.INTEGER,
    parcial: DataTypes.INTEGER,
    fm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asiento',
  });
  return Asiento;
};