import ArticuloService from "../services/ArticuloService";
import AlmacenItemsService from "../services/AlmacenItemsService"

class ArticuloController { 

  static getDelete(req, res) {                    
    ArticuloService.delete(req.params.id)
        .then((articulo) => {                                    
          ArticuloService.getData(1,15,'nombre','DESC')
          .then((data) => {                
            let resData = data.data.map((item,index)=>{
              let iok = {
                  "id"        : item.id,   
                  "codigo"    : item.codigoBarras,
                  "nombre"    : item.nombre,
                  "tipo"      : item.tipo,
                  "marca"     : item.marca.nombre,
                  "categoria" : item.categoria.nombre                
              }
          return iok;
          })
          res.status(200).send({message:"articulos lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
          })         
        })                   
        .catch((reason) => {              
          console.log(reason)
          res.status(400).send({ message: reason });
        });         
  }
 

  static setCopiar(req, res) {                           
    ArticuloService.getItem(req.params.id)
        .then((articulo) => {                
          let newItem = articulo
          newItem.id = null
          newItem.createdAt    = null
          newItem.updatedAt    = null
          newItem.codigo       = '(copia..)'
          newItem.codigoBarras = '(copia..)'
          newItem.nombre      = '(copia)'+articulo.nombre
          ArticuloService.setAdd(newItem)
          .then((itm)=>{
                ArticuloService.getData(1,15,'nombre','DESC')
                .then((data) => {                
                  let resData = data.data.map((item,index)=>{
                    let iok = {
                        "id"        : item.id,   
                        "codigo"    : item.codigoBarras,
                        "nombre"    : item.nombre,
                        "tipo"      : item.tipo,
                        "marca"     : item.marca.nombre,
                        "categoria" : item.categoria.nombre                
                    }
                return iok;
                })
                res.status(200).send({message:"articulos lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
                })
          })
        })                   
        .catch((reason) => {              
          console.log(reason)
          res.status(400).send({ message: reason });
        });         
  }

  static actualizar(req, res) {                           
    ArticuloService.setUpdate(req.body,req.params.id)
        .then((xarticulo) => {                
          ArticuloService.getItem(req.params.id)
            .then((articulo)=>{
              res.status(200).send({message:"articulo actualizado", result: articulo });
            })            
        })                   
        .catch((reason) => {              
          console.log(reason)
          res.status(400).send({ message: reason });
        });         
  }

  static getSearch(req, res) {    
    const { prop, value } = req.body      
    ArticuloService.search(prop,value)
        .then((data) => {                
          let resData = data.data.map((item,index)=>{
            let iok = {
                "id"        : item.id,   
                "codigo"    : item.codigoBarras,
                "nombre"    : item.nombre,
                "tipo"      : item.tipo,
                "marca"     : item.marca.nombre,
                "categoria" : item.categoria.nombre                
            }
        return iok;
        })
        res.status(200).send({message:"articulos lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
        })                   
        .catch((reason) => {     
          console.log(reason)         
          res.status(400).send({ message: reason });
        }); 
  }

  static getItem(req, res) {                           
    ArticuloService.getItem(req.params.id)
        .then((articulo) => {                
            res.status(200).send({message:"articulo item", result: articulo });                                               
        })                   
        .catch((reason) => {              
          console.log(reason)
          res.status(400).send({ message: reason });
        });         
  }

  static getData(req, res) {                           
    ArticuloService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
        .then((data) => {                
          let resData = data.data.map((item,index)=>{
            let iok = {
                "id"        : item.id,   
                "codigo"    : item.codigoBarras,
                "nombre"    : item.nombre,
                "tipo"      : item.tipo,
                "marca"     : item.marca.nombre,
                "categoria" : item.categoria.nombre                
            }
        return iok;
        })
        res.status(200).send({message:"articulos lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });         
  }

  static search(req, res) {    
    const { nombre, tipo, almacenId } = req.body        
    if(tipo === 'venta'){
       AlmacenItemsService.getData(1,15,nombre,0,almacenId,0,1) 
       .then((data)=>{ 
      
        let resData = data.data.map((item,index)=>{
          let iok = {
              "id"               : item.id,   
              "fechaVenta"       : item.cantidad,
              "stock"            : item.stock,
              "articuloId"       : item.articulo.id,
              "precioVenta"      : item.articulo.precioVenta,
              "nombre"           : item.articulo.nombre,
              "codigo"           : item.articulo.codigo,
              "marca"            : item.articulo.marca.nombre               
          }
      return iok;
      })        
      res.status(200).send({message:"articulos lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });            
       }) 

    }else{
       ArticuloService.getArticulosCompra(nombre)
       .then((data)=>{            
        res.status(200).send({message:"stock lista", result: data });
       })         
    } 
  }
  
  static lista(req, res) {                           
    ArticuloService.getList(req.params.name)
        .then((articulos) => {                
          res.status(200).send({message:"articulos lista", result: articulos });                                               
        })                   
        .catch((reason) => {  
          console.log(reason)            
          res.status(400).send({ message: reason });
        });         
  } 
    

    static crear(req, res) {           
        const { codigoBarras } = req.body        
          ArticuloService.verificar(codigoBarras)
            .then((row) => {                
                if(row)
                {
                  res.status(200).send({message:"el articulo ya existe", result: null });                          
                }else{
                  ArticuloService.setAdd(req.body)
                    .then((articulo)=>{                        
                        res.status(200).send({message:"articulo registrado", result: articulo });                           
                    })                               
                    .catch((reason) => {              
                        res.status(400).send({ message: reason });                    
                    })                                          
                }                    
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    }  
    
}

export default ArticuloController;
