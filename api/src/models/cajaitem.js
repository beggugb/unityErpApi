'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CajaItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CajaItem.belongsTo(models.Caja, {
        foreignKey: 'cajaId',
        as: 'caja',
      });
    }
  };
  CajaItem.init({
    monto: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    label: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    cajaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CajaItem',
  });
  return CajaItem;
};