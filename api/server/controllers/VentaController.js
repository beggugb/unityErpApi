import VentaService from "../services/VentaService";
import VentaItemsService from "../services/VentaItemsService";
import AlmacenItemsService from "../services/AlmacenItemsService"
import NotaCobranzaService from "../services/NotaCobranzaService"
import PlanService from "../services/PlanService"
import ComprobanteController from "./ComprobanteController";

class VentaController { 

    static search(req, res) {  

        const { prop, value } = req.body      
        console.log(req.body)

        let oprop  = prop === "observaciones" ? value: '0'
        let iprop  = prop === "cliente" ? value: '0'     
        let dDesde = prop === "fechaVenta" ? (value ? new Date(value)  : '2020-01-01') : '2020-01-01'        
        let fprop  = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]        
  
       

        VentaService.search(oprop,iprop,fprop)
            .then((data)=>{
                let resData = data.data.map((item,index)=>{
                    let iok = {
                        "id"               : item.id,   
                        "fechaVenta"       : item.fechaVenta,
                        "tipo"             : item.tipo,
                        "total"            : item.total,
                        "observaciones"    : item.observaciones,
                        "estado"           : item.estado,
                        "cliente"          : item.cliente.nombres,
                        "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                          
                    }
                return iok;
                })  
                res.status(200).send({message:"ventas lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} }); 
            })                  
            .catch((reason) => {              
            
              res.status(400).send({ message: reason });
            });         
      }

    static getData(req, res) {               
        VentaService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
            .then((data) => {                                                          
                    let resData = data.data.map((item,index)=>{
                        let iok = {
                            "id"               : item.id,   
                            "fechaVenta"       : item.fechaVenta,
                            "tipo"             : item.tipo,
                            "total"            : item.total,
                            "observaciones"    : item.observaciones,
                            "estado"           : item.estado,
                            "cliente"          : item.cliente.nombres,
                            "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                          
                        }
                    return iok;
                    })  
              res.status(200).send({message:"ventas lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
            })                   
            .catch((reason) => {  
                  
              res.status(400).send({ message: reason });
            });         
    }


    static actualizar(req, res) {       
        const { item, items } = req.body  
      
        let d       = new Date()
        let fventa  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]                               
        Promise.all([NotaCobranzaService.getKey("ventaId",item.id),VentaItemsService.delete(item.id)])
            .then(([xnota,xitems]) => {       
                let ynota = xnota                    
                    ynota.tipo              =  item.nroPagos > 1 ? "credito": "contado",
                    ynota.montoTotal        =  item.total
                    ynota.pagoTotal         =  0
                    ynota.saldoTotal        =  item.total
                    ynota.fechaVencimiento  = fventa                                        
                    ynota.cuotas            = item.nroPagos      
                    Promise.all([NotaCobranzaService.setUpdate(ynota,xnota.id),VentaItemsService.setAdd(items),VentaService.setUpdate(item,item.id)])                                  
                        .then((unota, ucompra,uitems)=>{
                            Promise.all([VentaService.getItem(item.id),VentaItemsService.getItems(item.id)])                                
                                .then(([item, itemss]) =>{   
                                    let items = itemss.map((item,index)=>{
                                        let iok = {
                                            "id"               : item.id,   
                                            "cantidad"         : item.cantidad,                                            
                                            "valor"            : item.valor,
                                            "articuloId"       : item.articulo.id,
                                            "nombre"           : item.articulo.nombre,
                                            "codigo"           : item.articulo.codigo,
                                            "marca"            : item.articulo.marca.nombre               
                                        }
                                    return iok;
                                    })                                                                                             
                                    res.status(200).send({message:"ventas lista", result: {item, items }});
                                }) 
                            })
                    })        
                           
            .catch((reason) => {  
                   
              res.status(400).send({ message: reason });
            });         
    }

    

    static crear(req, res) {               
        let d = new Date()
        let fventa  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]   
        let iok = req.body
        iok.fechaVenta =  fventa      
        iok.estado     =  "pendiente"   
        iok.clienteId = 1       
        iok.gestion = d.getFullYear()     
        iok.mes = d.getMonth()  +1    
        VentaService.setAdd(iok)
            .then((venta) => {                  
                let xnota = {
                    "nro": venta.id,
                    "tipo": "contado",
                    "montoTotal": 0,
                    "pagoTotal": 0,
                    "saldoTotal": 0,
                    "fechaVencimiento": fventa,                    
                    "ventaId": venta.id,
                    "cuotas": 0,
                    "isVenta": true
                }  
                NotaCobranzaService.setNota(xnota)
                    .then((xnota)=>{ 
                        VentaService.getData(1,12,'id','DESC')
                                .then((data)=>{
                                    let resData = data.data.map((item,index)=>{
                                        let iok = {
                                        "id"               : item.id,   
                                        "fechaVenta"       : item.fechaVenta,
                                        "tipo"             : item.tipo,
                                        "total"            : item.total,
                                        "observaciones"    : item.observaciones,
                                        "estado"           : item.estado,
                                        "cliente"          : item.cliente.nombres,                                        
                                        "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                     
                                        }
                                    return iok;
                                    })  
                                    res.status(200).send({message:"ventas lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });                                              
                                })                
                                .catch((reason) => {  
                                    console.log(reason)            
                                    res.status(400).send({ message: reason });
                                });
                        })                    

            })                   
            .catch((reason) => {  
                  
              res.status(400).send({ message: reason });
            });         
    }  

    static resumen(req, res) {               
        Promise.all([
            VentaService.getItem(req.params.id),
            VentaItemsService.getItems(req.params.id),
            NotaCobranzaService.getKey("ventaId",req.params.id)
            ])
          .then(([item,data,nota]) => {                              
                let items = data.map((item,index)=>{
                    let iok = {
                    "id"           : item.id,   
                    "cantidad"     : item.cantidad,
                    "valor"        : item.valor,                 
                    "articuloId"   : item.articuloId,                                                                      
                    "nombre"       : item.articulo.nombre,                        
                    "codigo"       : item.articulo.codigo,     
                    "ventaId"      : item.ventaId,              
                    "nombreCorto"  : item.articulo.nombreCorto,
                    "marca"        : item.articulo.marca.nombre
                    }
                return iok;
                })             
                
                    PlanService.getItems(nota.id)
                    .then((plan)=>{                        
                        res.status(200).send({message:"venta resumen", result: {item, items, nota, plan }});    
                   })                                                  
           })                   
           .catch((reason) => {  
                      
              res.status(400).send({ message: reason });
           });         
    }

    static borrar(req, res) {                                   
        Promise.all([NotaCobranzaService.getKey("ventaId",req.params.id),VentaItemsService.delete(req.params.id)])
            .then(([xxnota,yitems])=>{                                  
                NotaCobranzaService.delete(xxnota.id)
                .then((xnota)=>{
                    VentaService.delete(req.params.id)
                        .then((yitem)=>{
                            VentaService.getData(1,12,'id','DESC')
                            .then((data)=>{
                                let resData = data.data.map((item,index)=>{
                                    let iok = {
                                    "id"               : item.id,   
                                    "fechaVenta"      : item.fechaVenta,
                                    "tipo"             : item.tipo,
                                    "total"            : item.total,
                                    "observaciones"    : item.observaciones,
                                    "estado"           : item.estado,
                                    "cliente"          : item.cliente.nombres,
                                    "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                         
                                    }
                                return iok;
                                })  
                                res.status(200).send({message:"compras lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} }); 
                            })
                        })
                })                                      
            })                   
           .catch((reason) => {  
                      
              res.status(400).send({ message: reason });
           });         
    }

    static aprobar(req, res) {     
        let d = new Date()
        let fcompra  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]           
        const { item, items, contado,banco,inicial,cuota,total } = req.body    
        console.log(items)  
        VentaService.getItem(item.id)
        .then((rventa)=>{          
        if(rventa.estado === 'pendiente' || rventa.estado === 'transcripcion')
        {
        VentaItemsService.getList(item.id)
          .then((xitems) =>{
              xitems.map(it =>{
                  AlmacenItemsService.verificar(it.articuloId,item.almacenId)
                  .then((xite)=>{                                 
                      if(xite){                                              
                          let dt = xite
                              dt.stock = xite.stock - it.cantidad
                              AlmacenItemsService.setUpdate(dt,xite.id)
                              .then((iok)=>{console.log('actualizado')})                     
  
                      }
                  }) 
                  return;
              })
              /** Update venta */
              let ycompra = rventa
              ycompra.estado          = "cerrado"
              ycompra.fechaAprobacion = fcompra
  
              Promise.all([VentaService.setUpdate(ycompra,item.id),NotaCobranzaService.getKey("ventaId",item.id)])            
              .then(([xventa,xnota])=>{
                  let ynota = xnota                                                                               
                      ynota.cuotas = item.nroPagos 
                      ynota.pagoTotal  = inicial ? parseFloat(ynota.pagoTotal) + parseFloat(cuota) : ynota.pagoTotal
                      ynota.saldoTotal = inicial ? parseFloat(ynota.saldoTotal) - parseFloat(cuota) : ynota.saldoTotal
                  let iplan = []
                      items.map((it)=>{
                          let xdata={}
                          xdata.cuota  = it.cuota,
                          xdata.monto  = it.monto,
                          xdata.estado = it.estado,
                          xdata.fechaPago = it.fechaPago,
                          xdata.notaId    = xnota.id                              
                          iplan.push(xdata)
                          })    
                   Promise.all([PlanService.setAdd(iplan),NotaCobranzaService.setUpdate(ynota,xnota.id),VentaService.getData(1,12,'id','DESC'),
                   ComprobanteController.regComprobanteVenta(total,contado,banco,inicial,cuota,'Ingreso',ycompra.usuarioId,ycompra.clients,ycompra.observaciones)      
                    ])       
                     .then(([xx,yy,data,pp]) => {                                                          
                          let resData = data.data.map((item,index)=>{
                              let iok = {
                              "id"            : item.id,   
                              "fechaVenta"   : item.fechaVenta,
                              "tipo"          : item.tipo,
                              "total"         : item.total,
                              "observaciones"    : item.observaciones,
                              "estado"           : item.estado,
                              "cliente"          : item.cliente.nombres,
                              "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                          
                              }
                          return iok;
                          })  
                          console.log(pp)
                    res.status(200).send({message:"ventas lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
                  })               
              })
              
          })
      }else{
          CompraService.getData(1,12,'id','DESC')
          .then((data) => {                                                          
                  let resData = data.data.map((item,index)=>{
                      let iok = {
                      "id"            : item.id,   
                      "fechaVenta"   : item.fechaVenta,
                      "tipo"          : item.tipo,
                      "total"         : item.total,
                      "observaciones"    : item.observaciones,
                      "estado"           : item.estado,
                      "cliente"          : item.cliente.nombres,
                      "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                        
                      }
                  return iok;
                  })  
            res.status(200).send({message:"ventas lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
          }) 
         }         
      })
  }  

   

    
    
}

export default VentaController;
