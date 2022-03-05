import ArticuloService from "../services/ArticuloService";
import AlmacenItemsService from "../services/AlmacenItemsService";
import ClienteService from "../services/ClienteService";
import CompraService from "../services/CompraService";
import CompraItemsService from "../services/CompraItemsService";
import VentaService from "../services/VentaService";
import VentaItemsService from "../services/VentaItemsService";
import CajaService from "../services/CajaService"
import PlanService from "../services/PlanService";

class InformesController {


  static pagos(req, res) {
    const { desde, hasta, tipo, estado } = req.body;    

    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]     
       
    if(tipo === 'pagos')
    {
      PlanService.getDetallePagos(fdesde,fhasta,estado)
      .then((detallex) => {      
        let sumaTotal  = 0      
        let detalle = detallex.data.map((item,index)=>{
          let iok = {
          "id"          : item.id,
          "cuota"       : item.cuota,
          "monto"       : item.monto,
          "estado"      : item.estado ? 'pagado': 'pendiente',
          "fechaPago"   : item.fechaPago,
          "fechaPagado" : item.fechaPagado,
          "notaId"      : item.notaId,
          "compraId"    : item.nota.compra.id,
          "sujeto"      : item.nota.compra.proveedor.razonSocial
          }
          sumaTotal  = sumaTotal + parseFloat(item.monto)        
        return iok;
        })
        res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal } });     
      })
      .catch((reason) => {         
         
          res.status(400).send({ message: reason });
      });
    }else{
      PlanService.getDetalleCobros(fdesde,fhasta,estado)
      .then((detallex) => {      
        let sumaTotal  = 0      
        let detalle = detallex.data.map((item,index)=>{
          let iok = {
          "id"          : item.id,
          "cuota"       : item.cuota,
          "monto"       : item.monto,
          "estado"      : item.estado ? 'pagado': 'pendiente',
          "fechaPago"   : item.fechaPago,
          "fechaPagado" : item.fechaPagado,
          "notaId"      : item.notaId,
          "ventaId"     : item.nota.venta.id,
          "sujeto"      : item.nota.venta.cliente.nombres          
          }
          sumaTotal  = sumaTotal + parseFloat(item.monto)        
        return iok;
        })
        res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal } });     
      })
      .catch((reason) => {         
        
          res.status(400).send({ message: reason });
      });
    }
    
  }

  static cajas(req, res) {
    const { desde, hasta, usuarioId } = req.body;    

    console.log(req.body)
    
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]     
             
    CajaService.getDetalle(fdesde,fhasta,usuarioId)
    .then((detallex) => {  
      let sumaTotal  = 0      
      let detalle = detallex.data.map((item,index)=>{
        let iok = {
        "id"           : item.id,
        "estado"       : item.estado,
        "montoInicial" : item.montoInicial,
        "montoEgreso"  : item.montoEgreso,
        "montoIngreso" : item.montoIngreso,
        "montoFinal"   : item.montoFinal,
        "fechaCierre"  : item.fechaCierre,
        "fechaCaja"    : item.fechaCaja,
        "usuarioId"    : item.usuario.id,
        "usuario"      : item.usuario.nombres
        }
        sumaTotal  = sumaTotal + parseFloat(item.montoFinal)        
      return iok;
      })
      res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal } });       
      })
      .catch((reason) => {         
       
        res.status(400).send({ message: reason });
      });
  }

  static existencias(req, res) {
    const { almacenId,articuloId,categoriaId,value,rango,vrango } = req.body;        
             
    AlmacenItemsService.getDetalle(almacenId,articuloId,categoriaId,value,rango,vrango)
    .then((detallex) => {  
      let sumaTotal  = 0      
      let detalle = detallex.data.map((item,index)=>{
        let iok = {
        "id"           : item.articulo.id,
        "codigo"       : item.articulo.codigo,
        "nombre"       : item.articulo.nombre,
        "precioVenta"  : item.articulo.precioVenta,
        "almacen"      : item.almacen.nombre,
        "marca"        : item.articulo.marca.nombre,
        "categoria"    : item.articulo.categoria.nombre,
        "stock"        : item.stock,
        "articuloId"   : item.articuloId
        }
        sumaTotal  = sumaTotal + parseFloat(item.articulo.precioVenta)        
      return iok;
      })
      res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal } }); 
      })
      .catch((reason) => {         
       
        res.status(400).send({ message: reason });
      });
  }
  
  static general(req, res) {   
    const { desde, hasta, tipo, estado, rango, vrango } = req.body;    
    
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    if(tipo === "compras"){
      CompraService.getDetalle(fdesde,fhasta, estado, rango, vrango)
      .then((detallex) => {                             
        let sumaTotal  = 0
        let saldoTotal = 0
        let detalle = detallex.data.map((item,index)=>{
          let iok = {
          "id"            : item.id,   
          "fecha"         : item.fechaCompra,          
          "total"         : item.total,
          "observaciones" : item.observaciones,
          "estado"        : item.estado,
          "sujeto"        : item.proveedor.razonSocial,
          "saldo"         : item.notacobranza.saldoTotal          
          }
          sumaTotal  = sumaTotal + parseFloat(item.total)
          saldoTotal = saldoTotal + parseFloat(item.notacobranza.saldoTotal)
        return iok;
        })     
        
        res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal, saldo:saldoTotal } });
      })
      .catch((reason) => {         
      
        res.status(400).send({ message: reason });  
      });
    }else{
      VentaService.getDetalle(fdesde,fhasta, estado, rango, vrango)
      .then((detallex) => {                             
        let sumaTotal  = 0
        let saldoTotal = 0
        let detalle = detallex.data.map((item,index)=>{
          let iok = {
          "id"            : item.id,   
          "fecha"         : item.fechaVenta,          
          "total"         : item.total,
          "observaciones" : item.observaciones,
          "estado"        : item.estado,
          "sujeto"        : item.cliente.nombres,
          "saldo"         : item.notacobranza.saldoTotal          
          }
          sumaTotal  = sumaTotal + parseFloat(item.total)
          saldoTotal = saldoTotal + parseFloat(item.notacobranza.saldoTotal)
        return iok;
        })     
        
        res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal, saldo:saldoTotal } });
      })
      .catch((reason) => {         
    
        res.status(400).send({ message: reason });  
      });
    }        
  }

  static consolidado(req, res) {   
    Promise.all([      
      ArticuloService.getTotal(),      
      ClienteService.getTotal(),
      CompraService.getTotal(),
      VentaService.getTotal(), 
      CompraItemsService.getInformeData(),
      VentaItemsService.getInformeData(),
      PlanService.getInformeData(true,true), //cobros pagados
      PlanService.getInformeData(true,false), //cobros pendientes
      PlanService.getInformeData(false,true), //pagos pagados
      PlanService.getInformeData(false,false) //pagos pendientes
    ])
      .then(([articulosT, clienteT,compraT,ventaT,xcomprasT,xventasT,xcobrosTrue,xcobrosFalse,xpagosTrue,xpagosFalse]) => {        
        let comprasLabel = []        
        let comprasItem  = []        
        xcomprasT.map((item,index)=>{
          comprasLabel.push(item.articulo.nombre)
          comprasItem.push(parseInt(item.suma))
        })
        let ventasT = xventasT.map((item,index)=>{
          let iok = {           
          "y"      : parseInt(item.suma),          
          "name"   : item.articulo.nombre          
          }
     
        return iok;
        }) 
        let cobrosTrue   = parsearMes(xcobrosTrue)
        let cobrosFalse  = parsearMes(xcobrosFalse)
        let pagosTrue    = parsearMes(xpagosTrue)
        let pagosFalse = parsearMes(xpagosFalse)
        res.status(200).send({ result:{articulosT, clienteT,compraT,ventaT, comprasLabel,comprasItem,ventasT,cobrosTrue,cobrosFalse,pagosTrue,pagosFalse }});
      })      
      .catch((reason) => {
        
        res.status(400).send({ message: reason });
      });  
     
  }

  static categorias(req, res) {
    const { usuarioId } = req.body;          
      ArticuloService.sumCategorias()
        .then((xdata) => {
          ArticuloService.countCategorias()
          .then((ydata) => {
            let zdata = parsear(xdata.total,ydata)
            let zdatas = parse(ydata)
            res.status(200).send({ result: { detalle: zdatas, data: zdata} });
          })  
        })
        .catch((reason) => {         
         
        res.status(400).send({ message: reason });
      });
  }


}

function parsearMes(items){
  const newArray = [0,0,0,0,0,0,0,0,0,0,0,0]
  items.map((it =>{        
      switch(it.mes){
        case 1:
          newArray[0] = parseInt(it.total)        
        break;  
        case 2:
          newArray[1] = parseInt(it.total)
        break;  
        case 3:
          newArray[2] = parseInt(it.total)
          break;    
        case 4:
          newArray[3] = parseInt(it.total)
          break;
        case 5:
          newArray[4] = parseInt(it.total)
          break;
        case 6:
          newArray[5] = parseInt(it.total)
          break;
        case 7:
          newArray[6] = parseInt(it.total)
          break;
        case 8:
          newArray[7] = parseInt(it.total)
          break;
        case 9:
          newArray[8] = parseInt(it.total)
          break;
        case 10:
          newArray[9] = parseInt(it.total)
          break;                                           
        case 11:
          newArray[10] = parseInt(it.total)
          break;        
        case 12:
          newArray[11] = parseInt(it.total)
          break;
        default:
          break;
      }      
   }))
   return newArray
}
function parsear(total,items){
  const newArray = []
  items.map((it =>{        
    let dat = {}        
    dat.y = parseInt((it.y * 100) / total)    
    dat.name = it.categoria.nombre    
    newArray.push(dat)
   }))
   return newArray
}

function parse(items){
  const newArray = []
  items.map((it =>{        
 
    let dat = {}        
    dat.id = it.categoriaId
    dat.cantidad = parseInt(it.y)     
    dat.nombre = it.categoria.nombre    
    newArray.push(dat)
   }))
   return newArray
}
export default InformesController;

