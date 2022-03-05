import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Almacen } = database;

class AlmacenService {

    static getItemSucursal(sucursalId){
        return new Promise((resolve,reject) =>{
            Almacen.findOne({
              raw: true,
              nest: true,
              where: { sucursalId: sucursalId}
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 
    static getItems(){
        return new Promise((resolve,reject) =>{
            Almacen.findAll({
              raw: true,
              nest: true,                
              order: [['nombre','ASC']],
              attributes:[['nombre','label'],['id','value']]  
              })
            .then((row) => resolve(row))
            .catch((reason) => reject({ message: reason.message }))
        })
    }  
    
}
export default AlmacenService;
