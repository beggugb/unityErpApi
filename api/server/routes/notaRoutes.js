import { Router } from 'express';
import NotaController from '../controllers/NotaController';

const router = Router();
/*data*/
router.get('/cobros/data/:pagina/:num/:prop/:orden',NotaController.getCobros)
router.get('/pagos/data/:pagina/:num/:prop/:orden',NotaController.getPagos)


/*pagar*/
router.post('/compra/:tipo', NotaController.pagarCompra);
/*cobrar*/
router.post('/venta/:tipo', NotaController.pagarVenta);

/* buscar pagos */
router.post('/compra/search/lista', NotaController.searchPagos);
router.post('/venta/search/lista', NotaController.searchCobros);

/* buscar cobros */



export default router;
