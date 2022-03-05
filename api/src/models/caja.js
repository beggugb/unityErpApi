'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Caja.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
    }
  };
  Caja.init({
    estado: DataTypes.BOOLEAN,
    montoInicial: DataTypes.DECIMAL,
    montoEgreso: DataTypes.DECIMAL,
    montoIngreso: DataTypes.DECIMAL,
    montoFinal: DataTypes.DECIMAL,
    fechaCierre: DataTypes.DATE,
    fechaCaja: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER,
    nro: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caja',
  });
  return Caja;
};