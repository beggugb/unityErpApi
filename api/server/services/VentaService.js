import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Venta, Cliente, Usuario, NotaCobranza } = database;

class VentaService {

  static delete(id){
    return new Promise((resolve,reject) =>{
      Venta.destroy({ where: { id: Number(id) } })
      .then((cliente) => resolve(cliente))
      .catch((reason)  => reject(reason));
    })
  }

  static search(value,cliente,fecha){
    return new Promise((resolve,reject) =>{            
        let iValue   = '%' + value + '%'
        let iCliente = '%' + cliente + '%'

        if (value === '--todos--' || value === null || value === '0') { iValue = '%' }
        if (cliente === '--todos--' || cliente === null || cliente === '0') { iCliente = '%' }            

        console.log('glosa')
        console.log(iValue)
        console.log('cliente')
        console.log(iCliente)
        console.log('fechaVenta')
        console.log(fecha)
        Venta.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,
            where: {[Op.and]:[
                {fechaVenta: { [ fecha === '2020-01-01' ?Op.gt :Op.eq ]: fecha }},
                {observaciones: { [Op.iLike]: iValue }}
              ]},
            order: [['id','ASC']],
            attributes:["id","fechaVenta","tipo","total","observaciones","estado"],
            include:[
              { model:Cliente,
                as:"cliente",
                attributes:["id","nombres","email"],
                where: { nombres: { [Op.iLike]: iCliente }},
              },
              {model:NotaCobranza,as:"notacobranza",attributes:["id","saldoTotal"]}              
            ]  
        })		
        .then((rows) => resolve({
            paginas: Math.ceil(rows.count / 12),
            pagina: 1,
            total: rows.count,
            data: rows.rows
        } 
        ))
    .catch((reason)  => reject({ message: reason.message })) 
     })
   }
    
    static setAdd(dato){
        return new Promise((resolve,reject) =>{
            Venta.create(dato)
            .then((row) => resolve( row ))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    }  
    static setUpdate(value,id){
        return new Promise((resolve,reject) =>{
            Venta.update(value, { where: { id: Number(id) } })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message })) 
        })
    }
    static getItem(pky){
        return new Promise((resolve,reject) =>{
            Venta.findByPk(pky,{
              raw: true,
              nest: true,
              include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","email"]},
                {model:Usuario,as:"usuario",attributes:["id","nombres"]}
              ]  
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 
    static getData(pag,num,prop,value){
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Venta.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,
              order: [[prop,value]],
              attributes:["id","fechaVenta","tipo","total","observaciones","estado"],              
              include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","email"]},
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
    static dataUsuario(pag,num,prop,value){
        console.log(pag)
        console.log(num)
        console.log(prop)
        console.log(value)
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Venta.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,              
              where :  { usuarioId: prop },
              order: [['id','DESC']],
              attributes:["id","fechaVenta","tipo","total","observaciones","estado","estf","usuarioId"],              
              include:[
                  {model:Cliente,as:"cliente",attributes:["id","nombres"]},
                  {model:Usuario,as:"usuario",attributes:["id","nombres"]}
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
    static dataCajero(pag,num,prop,value){
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Venta.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,              
              where :  { isServicio : false },
              order: [['id','DESC']],
              attributes:["id","fechaVenta","tipo","total","observaciones","estado","estf","usuarioId"],              
              include:[
                  {model:Cliente,as:"cliente",attributes:["id","nombres"]},
                  {model:Usuario,as:"usuario",attributes:["id","nombres"]}
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
    static getTotal(){
      return new Promise((resolve,reject) =>{
        Venta.findOne({
            raw:true,
            nest:true,
            attributes: [
            [Sequelize.fn('count',Sequelize.col('id')),'total'],
            [Sequelize.fn('sum',Sequelize.col('total')),'suma']
          ]                  
  
          })
          .then((row) => resolve( row ))
          .catch((reason)  => reject({ message: reason.message }))  
      })
    }

    static getDetalleMes(desde,hasta){
      return new Promise((resolve,reject) =>{
        Venta.findAll({
            raw:true,
            nest:true,          
            where: {[Op.and]: [
              { fechaVenta: { [Op.between]: [desde, hasta]}},
              { estado: "cerrado"}
             ]},
             attributes: ['mes',[Sequelize.fn('count',Sequelize.col('id')),'total']],
             group: ['mes']  
          })
          .then((row) => resolve(row))
          .catch((reason)  => reject({ message: reason.message }))  
      })
    }

    static getMovimientos(desde,hasta,estado){
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
        Venta.findOne({
            raw:true,
            nest:true,
            attributes: ["id",  
            [Sequelize.fn('count',Sequelize.col('id')),'total'],
            [Sequelize.fn('sum',Sequelize.col('total')),'suma']],
            where: {[Op.and]: [
              { fechaVenta: { [Op.between]: [desde, hasta]}},
              { estado: "cerrado"}
             ]},  
            include:[{
              model:NotaCobranza,as:"notacobranza",
              attributes:["id","saldoTotal"],
              where: {saldoTotal : { [Op.between]: [iSaldo, fSaldo]}}
            }],
            group: ['id']  
          })
          .then((row) => resolve( row ))
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
        Venta.findAndCountAll({
            raw:true,
            nest:true,          
            where: {[Op.and]: [
              { fechaVenta: { [Op.between]: [desde, hasta]}},
              { estado: "cerrado"},
              { total: { [rango === 'menor' ? Op.lte:Op.gte]: vrango}},
             ]},
            attributes:["id","fechaVenta","tipo","total","observaciones","estado"],
            include:[
              {model:Cliente,as:"cliente",attributes:["id","nombres"]},              
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


}
export default VentaService; 
