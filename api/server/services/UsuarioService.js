
import database from "../../src/models";
import jwt from "jsonwebtoken";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario, Sucursal, Rol, Almacen } = database;

class UsuarioService {

static login(username, password) {        
    return new Promise((resolve, reject) => {
      Usuario.findOne({        
        where: { username: { [Op.eq]: username } },  
        attributes: ['id','nombres','username','password','rolId','sucursalId','isCajero'],
        include:[
          {model:Rol,as:"rol",attributes:["id","nombre"]},
          {model:Sucursal,as:"sucursal",attributes:["id","nombre"]}
       ]
      }).then((user) => {
        if (!user) {          
          resolve({
            success: false,
            message: "Authentication fallida . Usuario no existe.",
            usuario: null,
          });
        } else {          
          user.comparePassword(password, (err, isMatch) => {            
            if (isMatch && !err) {
              let payload = { user_id: user.id, username: user.username };
              let token = jwt.sign(payload, "unity2022", {
                expiresIn: "2629746000",
              });
              resolve({
                auth: true,
                message: "Acceso correcto",
                usuario: user,
                token: token,
              });              
            } else {
              resolve({
                success: false,
                message: "Autenticación fallida. contraseña incorrecta.",
                usuario: null,
              });              
            }
          });
        }
      });
    });
  }
  static getItem(pky){
    return new Promise((resolve,reject) =>{
       Usuario.findByPk(pky,{
        raw: true,
        nest: true,
        include:[ {model: Sucursal, as: "sucursal",attributes:['id','nombre']}]        
       })
        .then((item)=> resolve(item))
        .catch((reason) => reject({ message: reason.message }))      
    })
  }

  static getSingle(pky){
    return new Promise((resolve,reject) =>{
       Usuario.findByPk(pky,{
        raw: true,
        nest: true,
        attributes:['id','nombres'],
        include:[ {model: Sucursal, as: "sucursal",attributes:['id','nombre']}]        
       })
        .then((item)=> resolve(item))
        .catch((reason) => reject({ message: reason.message }))      
    })
  }
  static getItems(){
    return new Promise((resolve,reject) =>{
        Usuario.findAll({
          raw: true,
          nest: true,                
          order: [['nombres','ASC']],
          attributes:[['nombres','label'],['id','value']]  
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
} 

}
  export default UsuarioService; 