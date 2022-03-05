'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modelo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Modelo.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria',
      });
      Modelo.belongsTo(models.Marca, {
        foreignKey: 'marcaId',
        as: 'marca',
      });
    }
  };
  Modelo.init({
    nombre: DataTypes.STRING,
    marcaId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modelo',
  });
  return Modelo;
};