import KeyToken from './keyToken'
import usuarios from './usuarioRoutes'
import clientes from './clienteRoutes'
import categorias from './categoriaRoutes'
import marcas from './marcaRoutes'
import modelos from './modeloRoutes'
import articulos from './articuloRoutes'
import compras from './compraRoutes'
import mails from './mailRoutes'
import notas from './notaRoutes'
import tpv from './tpvRoutes'
import cajas from './cajaRoutes'
import cajasitems from './cajaItemsRoutes'
import ventas from './ventaRoutes'
import empresas from './empresaRoutes'
import almacenes from './almacenRoutes'
import proveedores from './proveedorRoutes'
import files from './fileRoutes'
import informes from './informeRoutes'
import pucs from './pucRoutes'
import comprobantes from './comprobanteRoutes'
import asientos from './asientoRoutes'
import contabilidad from './contabilidadRoutes'
import proceso from './procesoRoutes'
import tdc from './tdcRoutes'

export default(app) => {    
    app.use('/api/usuarios',usuarios);          
    app.use('/api/clientes',KeyToken,clientes);
    app.use('/api/categorias',KeyToken,categorias);
    app.use('/api/marcas',KeyToken,marcas);
    app.use('/api/modelos',KeyToken,modelos);
    app.use('/api/articulos',KeyToken,articulos);
    app.use('/api/compras',KeyToken,compras);
    app.use('/api/mails',KeyToken,mails);
    app.use('/api/notas',KeyToken,notas);
    app.use('/api/tpv',KeyToken,tpv);
    app.use('/api/cajas',KeyToken,cajas);
    app.use('/api/cajasitems',KeyToken,cajasitems);
    app.use('/api/ventas',KeyToken,ventas);
    app.use('/api/empresas',KeyToken,empresas);
    app.use('/api/almacenes',KeyToken,almacenes);
    app.use('/api/proveedores',KeyToken,proveedores);
    app.use('/api/files',KeyToken,files);
    app.use('/api/informes',KeyToken,informes);
    app.use('/api/pucs',KeyToken,pucs);
    app.use('/api/comprobantes',KeyToken,comprobantes);
    app.use('/api/asientos',KeyToken,asientos);
    app.use('/api/contabilidad',KeyToken,contabilidad);
    app.use('/api/procesos',KeyToken,proceso);
    app.use('/api/tdcs',KeyToken,tdc);
    
}

