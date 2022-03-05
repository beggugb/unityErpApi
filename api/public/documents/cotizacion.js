module.exports = (img,compra,items, usuario) => {
    const today = new Date();  
    var prevLogo = `<img src="${img}" border="0" alt="logo" width="90" height="40"/>`
    var coberturas = "<table class='tables-clausulas'>";
    coberturas += "<tr>";       
        coberturas += "<td width='15%' class='com'>Código</td>";        
        coberturas += "<td width='35%' class='com'>Artículo</td>";        
        coberturas += "<td width='15%' class='com'>Categoría</td>";        
        coberturas += "<td width='15%' class='com'>Marca</td>";
        coberturas += "<td width='10%' class='com'>Cantidad</td>";
        coberturas += "<td width='10%' class='com'>Valor</td>";                
        coberturas += "</tr>";
    for(var i in items){
        coberturas += "<tr>";       
        coberturas += "<td width='15%' class='cobes'>"+items[i].codigo+"</td>";        
        coberturas += "<td width='35%' class='cobes'>"+items[i].articulo.nombre+"</td>";        
        coberturas += "<td width='15%' class='cobes'>"+items[i].categoria+"</td>";        
        coberturas += "<td width='15%' class='cobes'>"+items[i].marca+"</td>";
        coberturas += "<td width='10%' class='cobi'>"+items[i].cantidad+"</td>";
        coberturas += "<td width='10%' class='cobi'>"+parseFloat(items[i].valor).toFixed(2)+" Bs.</td>";                        
        coberturas += "</tr>";
    }
        coberturas += "<tr>";               
        coberturas += "<td colspan='4'></td>";
        coberturas += "<td width='10%' class='cobet'>"+compra.nroItems+"</td>";
        coberturas += "<td width='10%' class='cobet'>"+parseFloat(compra.total).toFixed(2)+" Bs.</td>";                        
        coberturas += "</tr>";
 coberturas += "</table>"; 
   
   return `<html>
     <head>
       <meta charset="utf8">
       <title>SuitArt Business Card</title>
       <style>
         html, body {
           margin: 0;
           padding: 0;
           font-family: 'Sackers Gothic Std';
           font-weight: 500;
            font-size: 11px;
           background: rgb(241,241,241);
           -webkit-print-color-adjust: exact;
           box-sizing: border-box;
         }
   
         .page {
           position: relative;
           height: 100%;
           width: 100%;
           display: block;
           background: white;
           page-break-after: auto;        
           overflow: hidden;
         }
   
         @media print {
           body {
             background: white;
           }
   
           .page {
             margin: 0;
             height: 100%;
             width: 100%;
           }
         }
   
         .contenedor {        
           height: 98%;
           padding: 3px;
         }
   
       
         .cliente {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 3%;
           padding: 5px;
           width: 98%;
         }
         .cotizacion {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 8%;
           padding: 5px;
         }
   
   
         .tasas {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 8%;
           padding: 5px;
           background-color: #ebb18b;
         }
   
         .detalle {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 72%;
           padding: 5px;
         }
   
         .datos {        
           border-radius: 5px;
           height: 100%;        
           width: 20%;
           float: left;
         }
         .companias {        
           height: 100%;        
           width: 80%;
           float: left;
           padding-left: 3px;              
         }
         .tables-companias {        
           width: 100%;        
           height: 72%;
           border-spacing: 0;
           font-size: 11px;
           margin: 0 !important;
         }
   
         .tables-companias td{
           border: 1px solid #c1c1c1;                 
         }
         .tables-companias-titulos{        
           width: 100%;        
           height: 25%;
           border-spacing: 0;
            font-size: 11px;
         }
         .tables-companias-titulos td{
           border: 1px solid #c1c1c1;                     
           
         }
   
   
         .items {
           border: 1px solid #c1c1c1;  
           height: 75%;        
           width: 98%;
           float: left;
           border-radius: 5px;
           padding:5px;
         }
         
   
         .coberturas{          
           background-color: #1b88e4;                
           text-align: center;
           padding: 1px;
           color: #fff;
           font-weight: 600;
         }
         .clausulas{             
           background-color:  #1baae4;      
           text-align: center;
           padding: 1px;
           color: #fff;
           
         }
         .tables-clausulas {        
           width: 100%;                 
           border-spacing: 0;
           font-size: 11px;
           background-color: #fff;
         }
   
         .tables-clausulas td{
           border: 1px solid #c1c1c1;    
           text-align: center;               
         }
      
         .cobe{
           text-align: left !important; 
           padding-left: 2px;
           font-size: 9px;
         }
         .cobes{
            text-align: left !important; 
            padding-left: 2px;
            font-size: 8px;
          }
          .cobet{
            text-align: center !important; 
            padding-left: 2px;
            font-size: 8px;
            background-color: #eaeaea;
            font-weight: bold;

          }
          .cobi{
            text-align: center !important; 
            padding-left: 2px;
            font-size: 8px;
            background-color: #eaeaea;
          }
         .cob{
           font-size: 9px;
           text-align: center  !important; 
         }
         .cof{
           height: 60px;
           font-size: 9px;
           text-align: center !important;         
         }
         .com{
           height: 20px;
           font-size: 9px;
           text-align: center !important; 
           background-color: #009bd4;
         }
   
         .table-datos{                
           width: 99%;
           border-spacing: 0;
         }
         
   
         .table-datos td{                
           font-size: 8px; 
           border: 1px solid #eaeaea;       
         }
         h5{
           margin-left:15px;
         }
       </style>
     </head>
     <body>
       <div class="page">
         <div class="contenedor">  
         ${prevLogo}
         <h5>Orden de Compra # ${compra.id}</h5>      
           <div class="cliente">                   
             <table class="table-datos">
               <tr>
                 <td width="10%"><b>#  :</b></td>                            
                 <td width="20%">${compra.id}</td>            
                 <td width="10%"><b>Fecha :</b></td>                            
                 <td width="20%">${compra.fechaCompra}</td>            
                 <td width="10%"><b>Nº Items :</b></td>
                 <td width="10%">${compra.nroItems}</td>                      
                 <td width="10%"><b>Total :</b></td>                                    
                 <td width="10%">${parseFloat(compra.total).toFixed(2)} Bs.</td>
               </tr>               
             </table>
           </div>
           <div class="cotizacion">                   
             <table class="table-datos">              
               <tr>
                 <td width="10%"><b>Proveedor  :</b></td>                            
                 <td width="40%">${compra.proveedor.razonSocial}</td>            
                 <td width="10%"><b>Email :</b></td>                            
                 <td width="40%">${compra.proveedor.email}</td>                             
               </tr>          
             </table>
             <table class="table-datos">              
               <tr>
                 <td width="10%"><b>Usuario  :</b></td>                            
                 <td width="40%">${usuario.nombres}</td>            
                 <td width="10%"><b>Sucursal :</b></td>                            
                 <td width="40%">${usuario.sucursal.nombre}</td>                             
               </tr>          
             </table>
             <table class="table-datos">                             
               <tr>
                 <td width="10%"><b>Glosa  :</b></td>                            
                 <td width="90%">${compra.observaciones}</td>                             
               </tr>
             </table>
           </div>
           <div class="items">                   
            ${coberturas}
           </div>                      
         </div>  
       </div>    
     </body>
   </html>	`;
   };
   