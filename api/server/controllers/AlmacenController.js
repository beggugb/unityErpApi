import AlmacenItemsService from "../services/AlmacenItemsService";
import AlmacenService from "../services/AlmacenService";

class AlmacenController {  

    static getList(req, res) {                   
        AlmacenService.getItems(req.params.name,req.params.value)
            .then((almacenes) => {                
                res.status(200).send({message:"almacenes lista", result: almacenes });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    }

    static listaStock(req, res) {   
        const { pagina, num, name, codigo, almacenId, categoriaId, stock } = req.body                          
        AlmacenItemsService.getData(pagina,num,name, codigo, almacenId, categoriaId, stock)
            .then((data) => {  
                let resData = data.data.map((item,index)=>{
                        let iok = {
                        "id"           : item.id,                        
                        "articuloId"   : item.articuloId,                        
                        "stock"        : item.stock,                        
                        "nombre"       : item.articulo.nombre,
                        "categoriaId"  : item.articulo.categoriaId,
                        "codigoBarras" : item.articulo.codigoBarras,
                        "valor"        : item.articulo.precioVenta,
                        "filename"     : item.articulo.filename, 
                        "nombreCorto"  : item.articulo.nombreCorto,    
                        "oferta"       : item.articulo.inOferta,
                        "precioOferta" : item.articulo.precioOferta,
                        }
                    return iok;
                })              
                res.status(200).send({message:"stock lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });                                               
            })                   
            .catch((reason) => {   
                console.log(reason)           
              res.status(400).send({ message: reason });
        });         
    }  
    
}

export default AlmacenController;
