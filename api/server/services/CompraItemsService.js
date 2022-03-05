import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { CompraItem, Articulo, Categoria, Marca } = database;

class CompraItemService {

    static setAdd(data){
        return new Promise((resolve,reject) =>{
           CompraItem.bulkCreate(data,{individualHooks: true})
            .then((rows) => resolve({ message: 'compras registrada' }))
            .catch((reason)  => reject({ message: reason.message }))      
        })
    }
    static delete(datoId) {
        return new Promise((resolve, reject) => {
          CompraItem.destroy({ where: { compraId: Number(datoId) } })
            .then((rows) => resolve({ message: 'eliminado' }))
            .catch((reason)  => reject({ message: reason.message }))      
        });
    }
    static getItems(compra){
        return new Promise((resolve,reject) =>{          
          CompraItem.findAll({
              raw: true,
              nest: true,              
              order: [['id','ASC']],
              where: { compraId: compra},
              attributes:["id","articuloId","codigo","valor","categoria","marca","cantidad","compraId"],
              include:[{
                model:Articulo,as:"articulo",attributes:["id","nombre","codigo"],
                include:[
                  { model:Categoria,as:"categoria",attributes:["id","nombre"]},
                  { model:Marca,as:"marca",attributes:["id","nombre"]}
              ]
              }]  
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))
        })
    }
    static getList(compra){
        return new Promise((resolve,reject) =>{          
          CompraItem.findAll({
              raw: true,
              nest: true,              
              order: [['id','ASC']],
              where: { compraId: compra},
              attributes:["id","articuloId","cantidad"]              
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))
        })
    }

    static getInformeData(){
        return new Promise((resolve,reject) =>{      
            CompraItem.findAll({
              raw: true,
              nest: true,          
              limit: 10,
              /*order: [['valor','desc']],*/
              attributes: [[Sequelize.fn('sum',Sequelize.col('cantidad')),'suma'],"articuloId"],
              include:[{
                model:Articulo,as:"articulo",attributes:["nombre"]               
              }],               
              group: ['articuloId','nombre']  
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))
        })
    }
    
}
export default CompraItemService;
