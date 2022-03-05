import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Empresa } = database;

class EmpresaService {

    static getItem(pky){
        return new Promise((resolve,reject) =>{
            Empresa.findByPk(pky,{
              raw: true,
              nest: true
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 
    static getSingle(pky){
        return new Promise((resolve,reject) =>{
            Empresa.findByPk(pky,{
              raw: true,
              nest: true,
              attributes:['id','nombre','direccion','smtpHost','smtpUser','smtpPassword','smtpSecure','smtpPort']
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 
    
}
export default EmpresaService;
