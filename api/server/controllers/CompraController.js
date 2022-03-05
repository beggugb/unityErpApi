import CompraService from "../services/CompraService";
import CompraItemsService from "../services/CompraItemsService";
import AlmacenItemsService from "../services/AlmacenItemsService"
import NotaCobranzaService from "../services/NotaCobranzaService"
import PlanService from "../services/PlanService"
import ComprobanteController from "./ComprobanteController";


class CompraController { 

    static search(req, res) {  
        const { prop, value } = req.body        
        CompraService.search(prop,value)
            .then((data)=>{
                let resData = data.data.map((item,index)=>{
                    let iok = {
                    "id"            : item.id,   
                    "fechaCompra"   : item.fechaCompra,
                    "tipo"          : item.tipo,
                    "total"         : item.total,
                    "observaciones"    : item.observaciones,
                    "estado"           : item.estado,
                    "proveedor"        : item.proveedor.razonSocial,
                    "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                         
                    }
                return iok;
                })  
                res.status(200).send({message:"compras lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} }); 
            })                  
            .catch((reason) => {                            
              res.status(400).send({ message: reason });
            });         
      }
    

    static crear(req, res) {               
        let d = new Date()
        let fcompra  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]   
        let iok = req.body
        iok.fechaCompra =  fcompra      
        iok.estado      =  "pendiente"      
        iok.proveedorId = 1     
        iok.gestion = d.getFullYear()     
        iok.mes = d.getMonth() +1
        CompraService.setAdd(req.body)
            .then((compra) => {                  
                let xnota = {
                    "nro": compra.id,
                    "tipo": "contado",
                    "montoTotal": 0,
                    "pagoTotal": 0,
                    "saldoTotal": 0,
                    "fechaVencimiento": fcompra,                    
                    "compraId": compra.id,
                    "detalle": "s/n",
                    "cuotas": 0,
                    "isVenta": false
                }  
                NotaCobranzaService.setNota(xnota)
                    .then((xnota)=>{ 
                       CompraService.getData(1,12,'id','DESC')
                                .then((data)=>{
                                    let resData = data.data.map((item,index)=>{
                                        let iok = {
                                        "id"            : item.id,   
                                        "fechaCompra"   : item.fechaCompra,
                                        "tipo"          : item.tipo,
                                        "total"         : item.total,
                                        "observaciones"    : item.observaciones,
                                        "estado"           : item.estado,
                                        "proveedor"        : item.proveedor.razonSocial,
                                        "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                         
                                        }
                                    return iok;
                                    })  
                                    res.status(200).send({message:"compras lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });                                              
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

    static actualizar(req, res) {       
        const { item, items } = req.body   
        let d = new Date()
        let fcompra  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]                               
        Promise.all([NotaCobranzaService.getKey("compraId",item.id),CompraItemsService.delete(item.id)])
            .then(([xnota,xitems]) => {    
                let ynota = xnota                    
                    ynota.tipo       =  item.nroPagos > 1 ? "credito": "contado",
                    ynota.montoTotal =  item.total
                    ynota.pagoTotal  =  0
                    ynota.saldoTotal =  item.total
                    ynota.fechaVencimiento = fcompra                                        
                    ynota.cuotas      = item.nroPagos        
                    ynota.detalle = item.detalle                                         
                Promise.all([NotaCobranzaService.setUpdate(ynota,xnota.id),CompraItemsService.setAdd(items),CompraService.setUpdate(item,item.id)])
                   .then((unota, ucompra,uitems)=>{
                        Promise.all([CompraService.getItem(item.id),CompraItemsService.getItems(item.id)])
                                .then(([item, items]) =>{                            
                                    res.status(200).send({message:"compras lista", result: {item, items }});
                                }) 
                        }) 
                        .catch((reason) => {  
                                    
                            res.status(400).send({ message: reason });
                        });                                               

            })                   
            .catch((reason) => {  
                     
              res.status(400).send({ message: reason });
            });         
    }

    static borrar(req, res) {                                   
        Promise.all([NotaCobranzaService.getKey("compraId",req.params.id),CompraItemsService.delete(req.params.id)])
            .then(([xxnota,yitems])=>{                                  
                NotaCobranzaService.delete(xxnota.id)
                .then((xnota)=>{
                    CompraService.delete(req.params.id)
                        .then((yitem)=>{
                            CompraService.getData(1,12,'id','DESC')
                            .then((data)=>{
                                let resData = data.data.map((item,index)=>{
                                    let iok = {
                                    "id"            : item.id,   
                                    "fechaCompra"   : item.fechaCompra,
                                    "tipo"          : item.tipo,
                                    "total"         : item.total,
                                    "observaciones"    : item.observaciones,
                                    "estado"           : item.estado,
                                    "proveedor"        : item.proveedor.razonSocial,
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

    static resumen(req, res) {               
        Promise.all([
            CompraService.getItem(req.params.id),
            CompraItemsService.getItems(req.params.id),
            NotaCobranzaService.getKey("compraId",req.params.id)
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
                    "compraId"     : item.compraId,              
                    "nombreCorto"  : item.articulo.nombreCorto
                    }
                return iok;
                })             
                
                PlanService.getItems(nota.id)
                    .then((plan)=>{                        
                      res.status(200).send({message:"compra resumen", result: {item, items, nota, plan }});    
                })                                                  
           })                   
           .catch((reason) => {  
                       
              res.status(400).send({ message: reason });
           });         
    }

    static getData(req, res) {               
        CompraService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
            .then((data) => {                                                          
                    let resData = data.data.map((item,index)=>{
                        let iok = {
                        "id"            : item.id,   
                        "fechaCompra"   : item.fechaCompra,
                        "tipo"          : item.tipo,
                        "total"         : item.total,
                        "observaciones"    : item.observaciones,
                        "estado"           : item.estado,
                        "proveedor"        : item.proveedor.razonSocial,
                        "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                          
                        }
                    return iok;
                    })  
              res.status(200).send({message:"compras lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
            })                   
            .catch((reason) => {  
                    
              res.status(400).send({ message: reason });
            });         
    }

    
    static aprobar(req, res) {     
      let d = new Date()
      let fcompra  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      
      var fGestion = fcompra.getMonth()
      var fMes = d.getMonth() + 1
      const { item, items, contado,banco,inicial,cuota,total } = req.body      
      CompraService.getItem(item.id)
      .then((rcompra)=>{          
      if(rcompra.estado === 'pendiente' || rcompra.estado === 'transcripcion')
      {
      CompraItemsService.getList(item.id)
        .then((xitems) =>{
            xitems.map(it =>{
                AlmacenItemsService.verificar(it.articuloId,item.almacenId)
                .then((xite)=>{                                 
                    if(!xite)
                    {
                        let dt = {}
                            dt.articuloId = it.articuloId
                            dt.almacenId  = item.almacenId
                            dt.stock      = it.cantidad
                            AlmacenItemsService.setAdd(dt)    
                                .then((iok)=>{console.log('creado')})                       
                    }else{                        
                        let dt = xite
                            dt.stock = xite.stock + it.cantidad
                            AlmacenItemsService.setUpdate(dt,xite.id)
                            .then((iok)=>{console.log('actualizado')})                     

                    }
                }) 
                return;
            })
            /** Update compra */
            let ycompra = rcompra
            ycompra.estado          = "cerrado"
            ycompra.fechaAprobacion = fcompra
            

            Promise.all([CompraService.setUpdate(ycompra,item.id),NotaCobranzaService.getKey("compraId",item.id)])            
            .then(([xcompra,xnota])=>{
                let ynota = xnota                                                                               
                    ynota.cuotas     = item.nroPagos 
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
                 Promise.all([PlanService.setAdd(iplan),NotaCobranzaService.setUpdate(ynota,xnota.id),CompraService.getData(1,12,'id','DESC'),
                 ComprobanteController.regComprobanteAut(total,contado,banco,inicial,cuota,'Egreso',ycompra.usuarioId,ycompra.proveedors,ycompra.observaciones)                 
                ])       
                   .then(([xx,yy,data,pp]) => {                                                          
                        let resData = data.data.map((item,index)=>{
                            let iok = {
                            "id"            : item.id,   
                            "fechaCompra"   : item.fechaCompra,
                            "tipo"          : item.tipo,
                            "total"         : item.total,
                            "observaciones"    : item.observaciones,
                            "estado"           : item.estado,
                            "proveedor"        : item.proveedor.razonSocial,
                            "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                          
                            }
                        return iok;
                        })  
                  
                  res.status(200).send({message:"compras lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
                })               
            })
            
        })
    }else{
        CompraService.getData(1,12,'id','DESC')
        .then((data) => {                                                          
                let resData = data.data.map((item,index)=>{
                    let iok = {
                    "id"            : item.id,   
                    "fechaCompra"   : item.fechaCompra,
                    "tipo"          : item.tipo,
                    "total"         : item.total,
                    "observaciones"    : item.observaciones,
                    "estado"           : item.estado,
                    "proveedor"        : item.proveedor.razonSocial,
                    "estadoFinanciero" : (parseFloat(item.notacobranza.saldoTotal) > 0 || parseFloat(item.notacobranza.montoTotal) === 0)? "cuotas pendientes":"pagado"                        
                    }
                return iok;
                })  
          res.status(200).send({message:"compras lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
        }) 
       }         
    })
}  

    
    



      
    
}


export default CompraController;
