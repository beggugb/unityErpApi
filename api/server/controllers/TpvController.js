import CajaService from "../services/CajaService";
import CajaItemService from "../services/CajaItemService"
import VentaService from "../services/VentaService";
import VentaItemsService from "../services/VentaItemsService";
import AlmacenItemsService from "../services/AlmacenItemsService"
import NotaCobranzaService from "../services/NotaCobranzaService"
import PlanService from "../services/PlanService"
import ReciboService from "../services/ReciboService";

class TpvController {  

    static getData(req, res) {          
        if(req.params.orden === 4 || req.params.orden === '4'){
          VentaService.dataCajero(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
          .then((rows) =>{                              
            res.status(200).send({result: rows });                                  
            })
          .catch((reason) => {      
          
            res.status(400).send({ message: reason });
          }); 
        } else{
          VentaService.dataUsuario(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
            .then((rows) =>{                         
              res.status(200).send({result: rows });                                  
              })
            .catch((reason) => {      
              
              res.status(400).send({ message: reason });
            });
        }       
      }

    static crear(req, res) {        
        const { item, items, almacenId } = req.body          
        let d     = new Date()
        CajaService.getItemUsuario(item.usuarioId)     
            .then((xcaja)=>{
                if(xcaja){                    
                    let fventa = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
                    let zventa = item
                    zventa.fechaVenta = fventa
                    zventa.tipo = "tpv"
                    zventa.nroPagos = 1
                    zventa.tipo = 'contado'
                    zventa.estado = 'cerrado' 
                    VentaService.setAdd(zventa)
                        .then((xventa) => {  
                            let newItems = []
                            items.map(it =>{
                                let iok = {}
                                    iok.cantidad      = it.cantidad                                    
                                    iok.ventaId       = xventa.id
                                    iok.articuloId    = it.articuloId
                                    iok.valor         = it.valor	 
                                    iok.fechaRegistro = fventa
                                newItems.push(iok)
                              return;   
                            })
                            
                            VentaItemsService.setAdd(newItems)
                                .then((xitems)=>{
                                    items.map(xt=>{
                                        AlmacenItemsService.verificar(xt.articuloId,almacenId)
                                        .then((xite)=>{                                                                             
                                           let dt = xite
                                               dt.stock = xite.stock > 0 ? parseInt(xite.stock) - parseInt(xt.cantidad) : xite.stock
                                               AlmacenItemsService.setUpdate(dt,xite.id)
                                                .then((iok)=>{console.log('actualizado')})                     
                                        }) 
                                        return;     
                                    })

                                    let xnota = {
                                        "nro": xventa.id,
                                        "tipo": "contado",
                                        "montoTotal": item.total,
                                        "pagoTotal": item.total,
                                        "saldoTotal": 0,
                                        "fechaVencimiento": new Date(),                    
                                        "ventaId": xventa.id,
                                        "cuotas": 1,
                                        "isVenta": true
                                    }

                                    NotaCobranzaService.setNota(xnota)
                                        .then((xnota)=>{
                                            let xdoki = {}
                                            xdoki.cuota = 1
                                            xdoki.monto = item.total
                                            xdoki.estado = true
                                            xdoki.fechaPago = fventa
                                            xdoki.notaId = xnota
                                            xdoki.fechaPagado = fventa
                                            PlanService.setAddSingle(xdoki)
                                                .then((xplan)=>{
                                                    let xcitem = {}
                                                    xcitem.monto  = item.total
                                                    xcitem.tipo   = "ingreso"
                                                    xcitem.label  = "Pago tpv, venta nro. " + xventa.id
                                                    xcitem.estado = true
                                                    xcitem.cajaId = xcaja.id
                                                    CajaItemService.setAdd(xcitem)
                                                        .then((xcajaitem)=>{
                                                            let newCaja = xcaja                                                                                                                                                                                    
                                                            newCaja.montoIngreso = parseFloat(xcaja.montoIngreso) + parseFloat(item.total)
                                                            newCaja.montoFinal   = parseFloat(xcaja.montoFinal) +  parseFloat(item.total)
                                                            newCaja.nro          = parseFloat(xcaja.nro) +  1
                                                            Promise.all([CajaService.setUpdate(newCaja,xcaja.id),AlmacenItemsService.getData(1,22,'','',almacenId,0,3)])
                                                                .then(([xycaja,data])=>{
                                                                    let xrecibo = {}
                                                                    xrecibo.glosa   = "Venta Directa Nro."+xventa.id +" cliente:"+ item.clients
                                                                    xrecibo.monto   = item.total
                                                                    xrecibo.cliente = item.clients
                                                                    xrecibo.pagoId  = xplan.id                                                                    
                                                                    ReciboService.setAdd(xrecibo)
                                                                        .then((recibo)=>{          
                                                                            let resData = data.data.map((item,index)=>{
                                                                                let iok = {
                                                                                "id"          : item.id,                        
                                                                                "articuloId"  : item.articuloId,                        
                                                                                "stock"       : item.stock,                        
                                                                                "nombre"      : item.articulo.nombre,
                                                                                "categoriaId" : item.articulo.categoriaId,
                                                                                "codigoBarras" : item.articulo.codigoBarras,
                                                                                "valor"       : item.articulo.precioVenta,
                                                                                "filename"    : item.articulo.filename, 
                                                                                "nombreCorto" : item.articulo.nombreCorto,    
                                                                                }
                                                                            return iok;
                                                                        })                                              
                                                                        res.status(200).send({message:"stock lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });
                                                                    })
                                                                })    
                                                    })   
              

                                                })
                                        })
                                })    
                        })                           
                }else{
             
                    res.status(400).send({message:"no tiene caja abierta", result: null });                                               
                }
            })                           
            .catch((reason) => {   
                     
              res.status(400).send({ message: reason });
            });         
    }  
    
}

export default TpvController;
