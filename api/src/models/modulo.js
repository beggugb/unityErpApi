'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Modulo.belongsTo(models.Rol, {
        foreignKey: 'rolId',
        as: 'rol',
      });
    }
  };
  Modulo.init({
    path: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    component: DataTypes.STRING,
    layout: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modulo',
  });
  return Modulo;
};