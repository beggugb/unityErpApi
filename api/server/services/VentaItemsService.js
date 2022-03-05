import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { VentaItem, Articulo, Marca } = database;

class VentaItemsService {

    static getList(venta){
        return new Promise((resolve,reject) =>{          
          VentaItem.findAll({
              raw: true,
              nest: true,              
              order: [['id','ASC']],
              where: { ventaId: venta},
              attributes:["id","articuloId","cantidad"]              
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))
        })
    }
    
    static setAdd(data){
        return new Promise((resolve,reject) =>{
            VentaItem.bulkCreate(data,{individualHooks: true})
             .then((rows) => resolve({ message: 'venta registrada' }))
             .catch((reason)  => reject({ message: reason.message }))      
         })
    } 
    static delete(id){
        return new Promise((resolve,reject) =>{
            VentaItem.destroy({ where: { ventaId: Number(id) } })
            .then((items) => resolve(items))
            .catch((reason)  => reject(reason));
        })
    } 
    static getItems(ventaId){
        return new Promise((resolve,reject) =>{            
            VentaItem.findAll({
              raw: true,
              nest: true,                
              order: [['id','DESC']],
              where:{ventaId : ventaId},
              attributes:["id","cantidad","codigo","ventaId","articuloId","valor"],
              include: [{ 
                model: Articulo, as: "articulo",                            
                attributes:['id','codigo','codigoBarras','nombreCorto','nombre','precioVenta','filename','categoriaId'],
                    include:[
                    {model:Marca,as:"marca",attributes:["id","nombre"]}
                    ]            
                }]
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))            
        })
    }

    static getInformeData(){
        return new Promise((resolve,reject) =>{      
            VentaItem.findAll({
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
export default VentaItemsService; 
