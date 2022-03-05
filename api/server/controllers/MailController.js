import CompraService from "../services/CompraService";
import CompraItemsService from "../services/CompraItemsService";
import UsuarioService from "../services/UsuarioService";
import EmpresaService from "../services/EmpresaService";
import MailService from "../services/MailService";

import pdfCompra from '../../public/documents/compra'
const path = require('path');
const pdf = require('html-pdf');
const hostname = '192.168.0.100'
const port = 4000

var options = { 
  "format": "Letter", 
  "orientation":"landscape"    
 };

const createPdf = (compra,items,usuario) => {    
  let img = `http://${hostname}:${port}/api/static/images/empresa/sm/logo.png`;  
   pdf.create(pdfCompra(img,compra,items,usuario), options).toFile(`${process.cwd()}/api/public/documents/compra${compra.id}.pdf`, (err) => {
     if(err) { res.send(Promise.reject());}
         return 0	 
  })      
}
class MailController {  

  static enviarCotizacion(req, res) {            
        Promise.all([CompraService.getItem(req.params.id),CompraItemsService.getItems(req.params.id)])
        .then(([xcompra,xitems])=>{
          Promise.all([UsuarioService.getSingle(xcompra.usuarioId),EmpresaService.getSingle(1)])
          .then(([xusuario,xempresa])=>{                        
           Promise.all([createPdf(xcompra,xitems,xusuario)])           
           .then(([pdf]) => {  
            /*res.status(200).send({message:"marcas lista", result: pdf });    */
            MailService.sendCotizacion(xcompra,xusuario,xempresa)
              .then((mail)=>{
                res.status(200).send({message:"cotizacion enviada", result: mail });    
              })
              .catch((reason) => {                            
                res.status(400).send({ message: reason });
              });
            })  
          })
          
        })
    }  
    static enviarCompra(req, res) {            
      Promise.all([CompraService.getItem(req.params.id),CompraItemsService.getItems(req.params.id)])
      .then(([xcompra,xitems])=>{
        Promise.all([UsuarioService.getSingle(xcompra.usuarioId),EmpresaService.getSingle(1)])
        .then(([xusuario,xempresa])=>{                        
         Promise.all([createPdf(xcompra,xitems,xusuario)])           
         .then(([pdf]) => {            
          MailService.sendCompra(xcompra,xusuario,xempresa)
            .then((mail)=>{
              let iok = xcompra
              iok.estado = "pendiente"
              Promise.all([CompraService.setUpdate(iok,xcompra.id),CompraService.getData(1,12,'id','DESC')])
              .then(([ycompra,data])=>{
                res.status(200).send({message:"compra solicitada", result: data });    
              })              
            })
            .catch((reason) => {                     
              res.status(400).send({ message: reason });
            });
          })  
        })
        
      })
  }   
}



export default MailController;
