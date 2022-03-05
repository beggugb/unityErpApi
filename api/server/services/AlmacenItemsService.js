import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Almacen, AlmacenItem, Articulo, Marca, Categoria   } = database;

class AlmacenItemsService {

  static getData(pag,num,name,codigo,almacenId,categoriaId,value){
    return new Promise((resolve,reject) =>{  
      let page = parseInt(pag);
      let der = num * page - num;  
      let iStock     = 0;
      let fStock     = 5000;
      
      let iCategoria = categoriaId
      let fCategoria = categoriaId

      let iValue  = '%' + name + '%'
      let iCodigo = '%' + codigo + '%'
      
      if(name === '--todos--' || name === null || name === '0') { iValue = '%' }            
      if(codigo === '--todos--' || codigo === null || codigo === 0 || codigo === '0') { iCodigo = '%' }   
      if(value === 0) { iStock = 0, fStock = 0 }
      if(value === 1) { iStock = 1, fStock = 5000 }     
      if(categoriaId === 0 || categoriaId === '0' || categoriaId === 'undefined' ) 
      { iCategoria = 0, fCategoria = 5000 }     


       AlmacenItem.findAndCountAll({
        raw: true,
        nest: true,           
        offset: der,
        limit: num,   
        where: {[Op.and]: [
          { almacenId: almacenId },             
          { stock: { [Op.between]: [iStock, fStock]}},     
        ]},   
          include: [{ 
            model: Articulo, as: "articulo",            
            where: {[Op.and]: [
              {categoriaId: {[Op.between]: [iCategoria,fCategoria]}},
              {nombre: { [Op.iLike]: iValue}},
              {codigoBarras: { [Op.iLike]: iCodigo}}
            ]},
            attributes:['id','precioOferta','inOferta','codigo','codigoBarras','nombreCorto','nombre','precioVenta','filename','categoriaId'],
            include:[
              {model:Marca,as:"marca",attributes:["id","nombre"]}
            ]
            }]  
  
       })
        .then((rows)=> resolve({
          paginas: Math.ceil(rows.count / num),
          pagina: page,
          total: rows.count,
          data: rows.rows
        } ))
        .catch((reason) => reject({ message: reason.message }))      
    })
  }

 
    
  static setAdd(dato){
        return new Promise((resolve,reject) =>{
            AlmacenItem.create(dato)
            .then((iitem) => resolve( iitem ))
            .catch((reason)  => reject({ message: reason.message }))      
        })
    }
  
    static setUpdate(dato, datoId) {
        return new Promise((resolve, reject) => {
            AlmacenItem.update(dato, { where: { id: Number(datoId) } })
            .then((cliente) => resolve(cliente))
            .catch((reason) => reject(reason));
        });
    }

    static verificar(articuloId,almacenId) {      
        return new Promise((resolve, reject) => {        
          AlmacenItem.findOne({
            raw: true,
            nest: true,                        
            where :  {
                [Op.and]: [
                  { almacenId: {[Op.eq]: almacenId }},
                  { articuloId: {[Op.eq]: articuloId }},
                ] 
              },
              attributes:["id","almacenId","articuloId","stock"]   
          })           
            .then((result) => {                              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });             
        });
    }

    static getDetalle(almacenId,articuloId,categoriaId,value,rango,vrango){
      return new Promise((resolve,reject) =>{  
        
        console.log(almacenId)
        console.log(articuloId)
        console.log(categoriaId)
        console.log(value)
        console.log(rango)
        console.log(vrango)
        
        let iStock     = 0;
        let fStock     = 5000;
        if(value === 0) { iStock = 0, fStock = 0 }
        if(value === 1) { iStock = 1, fStock = 5000 }     
        
        AlmacenItem.findAndCountAll({
          raw: true,
          nest: true,                     
          where: {[Op.and]: [            
            { almacenId: {[almacenId === 0 ? Op.gt: Op.eq]: almacenId}},            
            { stock: { [Op.between]: [iStock, fStock]}},     
            { articuloId: {[articuloId === 0 ? Op.gt: Op.eq]: articuloId}}
          ]},   
            include: [{ 
              model: Articulo, as: "articulo",            
              where: {[Op.and]: [                
                { categoriaId: {[categoriaId === 0 ? Op.gt: Op.eq]: categoriaId}},                                
                { precioVenta: { [rango === 'menor' ? Op.lte:Op.gte]: vrango}},
              ]},
              attributes:['id','codigo','codigoBarras','nombreCorto','nombre','precioVenta','filename','categoriaId'],
              include:[
                {model:Marca,as:"marca",attributes:["id","nombre"]},
                {model:Categoria,as:"categoria",attributes:["id","nombre"]}
              ]
              },
              {model:Almacen,as:"almacen",attributes:["id","nombre"]},
            ]  
    
         })
          .then((rows)=> resolve({            
            total: rows.count,
            data: rows.rows
          } ))
          .catch((reason) => reject({ message: reason.message }))      
      })
    }


    

   
   
    
}
export default AlmacenItemsService;
