'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sucursal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sucursal.belongsTo(models.Empresa, {
        foreignKey: 'empresaId',
        as: 'empresa',
      });
    }
  };
  Sucursal.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    pais: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    empresaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sucursal',
  });
  return Sucursal;
};