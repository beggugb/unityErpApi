'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    codigo: DataTypes.STRING,
    nombres: DataTypes.STRING,
    pais: DataTypes.STRING,	  
    ciudad: DataTypes.STRING,	  
    email: DataTypes.STRING,
    web: DataTypes.STRING,	  
    direccion: DataTypes.STRING,
    tipo: DataTypes.STRING,
    nit: DataTypes.STRING,
    nombreNit: DataTypes.STRING,
    estado: DataTypes.STRING,
    filename: DataTypes.STRING,
    telefono: DataTypes.STRING,
    codpostal: DataTypes.STRING,
    observaciones: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
