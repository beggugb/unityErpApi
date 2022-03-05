'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Marca.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria',
      });
    }
  };
  Marca.init({
    nombre: DataTypes.STRING,
    abreviacion: DataTypes.STRING,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Marca',
  });
  return Marca;
};