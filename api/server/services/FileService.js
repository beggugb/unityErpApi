import database from "../../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sharp = require("sharp");
const multer = require('multer');
const uuidv4 = require('uuid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'api/public/images/trash')
    },
    filename: function (req, file, cb) {
  
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
var upload = multer({ storage: storage }).single('file')

class FilesService {

    static proveedores(req,res) { 
        return new Promise((resolve, reject) => {
            upload(req, res, function (err) {
              if (err instanceof multer.MulterError) {
                resolve(err)
              } else if (err) {
                resolve(err)
              }
              sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/proveedores/lg/' + req.file.filename);
              sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/proveedores/md/' + req.file.filename);
              sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/proveedores/sm/' + req.file.filename);
              resolve(req.file)
            })
          })
      }	
    
   static clientes(req,res) {         
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/clientes/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/clientes/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/clientes/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  } 

  static articulos(req,res) {         
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/articulos/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/articulos/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/articulos/sm/' + req.file.filename);
          resolve(req.file)
        })
      })
  }
 

 
}

export default FilesService;

