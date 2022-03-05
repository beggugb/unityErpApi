'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tdc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tdc.init({
    monto: DataTypes.DECIMAL,
    fechaRegistro: DataTypes.DATE,
    gestion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tdc',
  });
  return Tdc;
};