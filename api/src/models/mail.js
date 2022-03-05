'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mail.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      Mail.belongsTo(models.Proveedor, {
        foreignKey: 'proveedorId',
        as: 'proveedor',
      });
      Mail.belongsTo(models.Compra, {
        foreignKey: 'compraId',
        as: 'compra',
      });
    }
  };
  Mail.init({
    to: DataTypes.STRING,
    referencia: DataTypes.STRING,
    detalle: DataTypes.STRING,
    tipo: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    proveedorId: DataTypes.INTEGER,
    compraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};