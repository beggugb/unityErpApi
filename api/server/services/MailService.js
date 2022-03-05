import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Marca } = database;
import nodeMailer from "nodemailer";
class MailService {

    static sendCotizacion(compra,usuario,empresa) {   
      console.log(empresa)         
        return new Promise((resolve, reject) => {
            let transporter = nodeMailer.createTransport({
              host: empresa.smtpHost,
              port: empresa.smtpPort,
              secure: true,
              auth: {
                user: empresa.smtpUser,
                pass: empresa.smtpPassword,
              },
            });
            
            let template    = cotizacion(compra,usuario);
            let templateMsg = "Solicitud de Cotización";
            let emailUser   = compra.proveedor.email;
         
           
            let mailOptions = {
              to: emailUser,
              subject: templateMsg,
              html: template,
              attachments: [
                {   
                    filename: `compra${compra.id}.pdf`,
                    path: `${process.cwd()}/api/public/documents/compra${compra.id}.pdf`
                }] 
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                resolve({ mail: error });
              }
              resolve({ mail: "ok" });
            });
          });
      } 

      static sendCompra(compra,usuario,empresa) {                
          return new Promise((resolve, reject) => {
              let transporter = nodeMailer.createTransport({
                host: empresa.smtpHost,
                port: empresa.smtpPort,
                secure: true,
                auth: {
                  user: empresa.smtpUser,
                  pass: empresa.smtpPassword,
                },
              });
              
              let template    = compras(compra,usuario);
              let templateMsg = "Solicitud de Compra";
              let emailUser   = compra.proveedor.email;
           
             
              let mailOptions = {
                to: emailUser,
                subject: templateMsg,
                html: template,
                attachments: [
                  {   
                      filename: `compra${compra.id}.pdf`,
                      path: `${process.cwd()}/api/public/documents/compra${compra.id}.pdf`
                  }] 
              };
          
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  resolve({ mail: error });
                }
                resolve({ mail: "ok" });
              });
            });
        } 
    
}

function cotizacion(compra,usuario){
    let fecha = new Date()
    let template =`<body><h2>Compra N° ${compra.id}</h2>      
                    <p><b>Proveedor :</b> ${compra.proveedor.razonSocial}</p>
                    <p><b>Email :</b> ${compra.proveedor.email}</p>
                    <p><b>Fecha :</b> ${fecha}</p>
                    <p>                        
                    <p>Adjunta la Cotización realizada</p>                                    
                    <p>En esta dirección de correo recibirás solo lo importante. </p>                                    
                    <p>Tu Administrador 2.1</p>
                  </body>`
    return template                  
  }
function compras(compra,usuario){
    let fecha = new Date()
    let template =`<body><h2>Compra N° ${compra.id}</h2>      
                    <p><b>Proveedor :</b> ${compra.proveedor.razonSocial}</p>
                    <p><b>Email :</b> ${compra.proveedor.email}</p>
                    <p><b>Fecha :</b> ${fecha}</p>
                    <p>                        
                    <p>Adjunta la Solicitude de Compra</p>                                    
                    <p>En esta dirección de correo recibirás solo lo importante. </p>                                    
                    <p>Tu Administrador 2.1</p>
                  </body>`
    return template                  
  }  
export default MailService;
