import UsuarioService from "../services/UsuarioService";
import ModuloService from "../services/ModuloService";
import AlmacenService from "../services/AlmacenService"

class UsuarioController {

  static getItems(req, res) {                   
    UsuarioService.getItems()
        .then((usuarios) => {                
            res.status(200).send({message:"usuarios lista", result: usuarios });                                               
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });         
  }


  
  static login(req, res) {
    const { username, password, start, end } = req.body;    
    UsuarioService.login(username, password)
      .then((user) => {          
        if(user.usuario){       
          Promise.all([
            ModuloService.getList(user.usuario.rolId), 
            AlmacenService.getItemSucursal(user.usuario.sucursalId)                        
          ])
            .then(([modulos, almacen]) =>{                                         
              res.status(200).send({ user,modulos, almacen}); 
            })        
        }else{
          res.status(400).send({ message: user.message });
        }        
      })                   
      .catch((reason) => {              	    
        res.status(400).send({ message: reason });
    });
  }
}

export default UsuarioController;
