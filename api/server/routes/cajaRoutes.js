import { Router } from 'express';
import CajaController from '../controllers/CajaController';

const router = Router();
router.get('/data/:pagina/:num/:prop/:orden',CajaController.getData)
router.post('/:tipo', CajaController.crear);
router.put('/:id/:tipo', CajaController.actualizar);
router.get('/item/:id', CajaController.resumen);
router.post('/search/list', CajaController.verificar);
export default router;
