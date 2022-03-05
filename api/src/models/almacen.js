'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Almacen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Almacen.belongsTo(models.Sucursal, {
        foreignKey: 'sucursalId',
        as: 'sucursal',
      });
    }
  };
  Almacen.init({
    nombre: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    encargado: DataTypes.STRING,
    tipo: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    sucursalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Almacen',
  });
  return Almacen;
};