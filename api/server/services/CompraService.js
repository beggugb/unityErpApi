import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Compra, Proveedor, NotaCobranza, Usuario } = database;

class CompraService {

  static search(prop,value){
    return new Promise((resolve,reject) =>{

      let iValue = ''
      let pValue = ''

      if(prop === 'observaciones'){
        iValue = (value === '--todos--' || value === null || value === '0') ? iValue = '%' : '%' + value + '%' 
        pValue = '%'
      }else{
        pValue = (value === '--todos--' || value === null || value === '0') ? pValue = '%' : '%' + value + '%' 
        iValue = '%'
      }

      console.log(iValue)
      console.log(pValue)
      
      Compra.findAndCountAll({
          raw: true,
          nest: true,
          offset: 0,
          limit: 12,
          where: { observaciones: { [Op.iLike]: iValue }},
          order: [['id','DESC']],
          attributes:["id","fechaCompra","tipo","total","observaciones","estado"],              
          include:[
            {model:Proveedor,
                as:"proveedor",
                attributes:["id","razonSocial"],
                where: { razonSocial: { [Op.iLike]: pValue }},

            },
            {model:NotaCobranza,as:"notacobranza",attributes:["id","saldoTotal"]}
          ]  
        })
        .then((rows) => resolve({
          paginas: Math.ceil(rows.count / 12),
          pagina: 1,
          total: rows.count,
          data: rows.rows
        }))
        .catch((reason) => reject({ message: reason.message }))
    })
}

    static delete(id){
      return new Promise((resolve,reject) =>{
        Compra.destroy({ where: { id: Number(id) } })
        .then((cliente) => resolve(cliente))
        .catch((reason)  => reject(reason));
      })
    }
    static setAdd(value){
        return new Promise((resolve,reject) =>{
            Compra.create(value)
            .then((row) => resolve( row ))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    } 
    static getData(pag,num,prop,value){
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Compra.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,
              order: [[prop,value]],
              attributes:["id","fechaCompra","tipo","total","observaciones","estado"],              
              include:[
                {model:Proveedor,as:"proveedor",attributes:["id","razonSocial"]},
                {model:NotaCobranza,as:"notacobranza",attributes:["id","saldoTotal"]}
              ]  
            })
            .then((rows) => resolve({
              paginas: Math.ceil(rows.count / num),
              pagina: page,
              total: rows.count,
              data: rows.rows
            }))
            .catch((reason) => reject({ message: reason.message }))
        })
    }
    static setUpdate(value,id){
      return new Promise((resolve,reject) =>{
          Compra.update(value, { where: { id: Number(id) } })
          .then((row)=> resolve( row ))
          .catch((reason) => reject({ message: reason.message })) 
      })
  }
  static getItem(pky){
    return new Promise((resolve,reject) =>{
        Compra.findByPk(pky,{
          raw: true,
          nest: true,
          include:[
            {model:Proveedor,as:"proveedor",attributes:["id","razonSocial","codigo","email"]},
            {model:Usuario,as:"usuario",attributes:["id","nombres"]}
        ]  
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
  }
  static getTotal(){
    return new Promise((resolve,reject) =>{
      Compra.findOne({
          raw:true,
          nest:true,
          attributes: [  
          [Sequelize.fn('count',Sequelize.col('id')),'total'],
          [Sequelize.fn('sum',Sequelize.col('total')),'suma']]    

        })
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
  }

  

  static getDetalleMes(desde,hasta){
    return new Promise((resolve,reject) =>{
      Compra.findAll({
          raw:true,
          nest:true,          
          where: {[Op.and]: [
            { fechaCompra: { [Op.between]: [desde, hasta]}},
            { estado: "cerrado"}
           ]},
           attributes: ['mes',[Sequelize.fn('count',Sequelize.col('id')),'total']],
           group: ['mes']  
        })
        .then((row) => resolve(row))
        .catch((reason)  => reject({ message: reason.message }))  
    })
  }

  static getDetalle(desde,hasta,estado,rango,vrango){
    return new Promise((resolve,reject) =>{
      let iSaldo = 0
      let fSaldo = 1000000
      switch(estado){
        case "pagado":
          iSaldo = 0
          fSaldo = 0
          break;
        case "saldo":
          iSaldo = 1
          fSaldo = 1000000  
          break;
        default:
          break;
      }
      Compra.findAndCountAll({
          raw:true,
          nest:true,          
          where: {[Op.and]: [
            { fechaCompra: { [Op.between]: [desde, hasta]}},
            { estado: "cerrado"},
            { total: { [rango === 'menor' ? Op.lte:Op.gte]: vrango}},
           ]},
          attributes:["id","fechaCompra","tipo","total","observaciones","estado"],
          include:[
            {model:Proveedor,as:"proveedor",attributes:["id","razonSocial"]},
            {
              model:NotaCobranza,as:"notacobranza",
              attributes:["id","saldoTotal"],
              where: {saldoTotal : { [Op.between]: [iSaldo, fSaldo]}}
            }
          ]
        })
        .then((rows) => resolve({                    
          total: rows.count,
          data: rows.rows          
        }))
        .catch((reason)  => reject({ message: reason.message }))  
    })
  }

  /*static getTotalMovimientos(desde,hasta,estado){    
    return new Promise((resolve,reject) =>{ 
      let iSaldo = 0
      let fSaldo = 1000000
      switch(estado){
        case "pagado":
          iSaldo = 0
          fSaldo = 0
          break;
        case "saldo":
          iSaldo = 1
          fSaldo = 1000000  
          break;
        default:
          break;
      }

      Compra.findOne({
          raw:true,
          nest:true,
          attributes: [           
          [Sequelize.fn('sum',Sequelize.col('total')),'suma']],
          where: {[Op.and]: [
            { fechaCompra: { [Op.between]: [desde, hasta]}},
            { estado: "cerrado"}
           ]}, 
           include:[            
            {
              model:NotaCobranza,as:"notacobranza",
              attributes:["id","saldoTotal"],
              where: {saldoTotal : { [Op.between]: [iSaldo, fSaldo]}}
            }
          ]   
        })
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
  }*/




    
}
export default CompraService;
