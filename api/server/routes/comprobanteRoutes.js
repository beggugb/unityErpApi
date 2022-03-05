import { Router } from 'express';
import ComprobanteController from '../controllers/ComprobanteController';

const router = Router();
/** Simples */
router.post('/:tipo', ComprobanteController.crear)
router.get('/data/:pagina/:num/:prop/:orden',ComprobanteController.getData)
router.get('/item/:id',ComprobanteController.getItem)
router.put('/aprobar/:id/:tipo', ComprobanteController.aprobar);
router.put('/:id/:tipo',ComprobanteController.actualizar)
router.post('/search/lista',ComprobanteController.search)
/*router.delete('/:id/:tipo',ClienteController.getDelete)*/

router.post('/registrar/registrar/items',ComprobanteController.regComprobanteVenta)


export default router;
