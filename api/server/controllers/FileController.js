import FileService from "../services/FileService";
import ArticuloService from "../services/ArticuloService";
import ProveedorService from "../services/ProveedorService";
import ClienteService from "../services/ClienteService";

class FileController {  

    static proveedores(req, res) { 
        FileService.proveedores(req, res)
          .then((file) => {
            const art = {}
            art.filename = file.filename
            ProveedorService.setUpdate(art, req.params.id)
              .then((result) => {
                    res.status(200).send({ result })
                  })
          })
          .catch(reason => {
       
            res.status(400).send({ 'message': reason })
          })
   
      }	

    static articulos(req, res) {      
        FileService.articulos(req, res)
          .then((file) => {
            const art = {}
            art.filename = file.filename
            ArticuloService.setUpdate(art, req.params.id)
              .then((result) => {
                    res.status(200).send({ result })
                  })
          })
          .catch(reason => {
           
            res.status(400).send({ 'message': reason })
          })
        
      }
     
     static clientes(req, res) {
        FileService.clientes(req, res)
          .then((file) => {
            const art = {}
            art.filename = file.filename
            ClienteService.setUpdate(art, req.params.id)
              .then((result) => {
                    res.status(200).send({ result })
                  })
          })
          .catch(reason => {
          
            res.status(400).send({ 'message': reason })
          })
   
      }    
    
}

export default FileController;
