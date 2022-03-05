'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proceso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proceso.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      Proceso.belongsTo(models.Comprobante, {
        foreignKey: 'comprobanteId',
        as: 'comprobante',
      });
    }
  };
  Proceso.init({
    nombre: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    usuarioId: DataTypes.INTEGER,
    comprobanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proceso',
  });
  return Proceso;
};