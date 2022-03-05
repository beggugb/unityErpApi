'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Rol, {
        foreignKey: 'rolId',
        as: 'rol',
      });
      Usuario.belongsTo(models.Sucursal, {
        foreignKey: 'sucursalId',
        as: 'sucursal',
      });
      
    }
  };
  Usuario.init({
    nombres: DataTypes.STRING,
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    rolId: DataTypes.INTEGER,
    sucursalId: DataTypes.INTEGER,
    isCajero: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  Usuario.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch){
      if(err){
        return cb(err);
      }
      cb(null,isMatch);
    })
  };
  return Usuario;
};