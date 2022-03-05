'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Articulo.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria',
      });
      Articulo.belongsTo(models.Marca, {
        foreignKey: 'marcaId',
        as: 'marca',
      });
     
    }
  };
  Articulo.init({
    codigo: DataTypes.STRING,
    codigoBarras: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },	  
    estado: DataTypes.BOOLEAN,
    nombre: DataTypes.STRING,    
    nombreCorto: DataTypes.STRING,	  
    tipo: DataTypes.STRING,
    descripcion: DataTypes.STRING,	  
    inCatalogo: DataTypes.BOOLEAN,
    inOferta: DataTypes.BOOLEAN,	  
    precioCosto: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL,
    precioOferta: DataTypes.DECIMAL,
    pGanancia: DataTypes.DECIMAL,
    impuestoIva: DataTypes.DECIMAL,
    impuestoIt: DataTypes.DECIMAL,
    pServicio: DataTypes.INTEGER,
    stockMinimo: DataTypes.INTEGER,
    stockTiempo: DataTypes.INTEGER,
    origen: DataTypes.STRING,	  
    filename: DataTypes.STRING,
    categoriaId: DataTypes.INTEGER,
    marcaId: DataTypes.INTEGER,
    modelo: DataTypes.STRING,
    unidad: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Articulo',
  });
  return Articulo;
};
