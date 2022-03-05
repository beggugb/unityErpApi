import { Router } from 'express';
import VentaController from '../controllers/VentaController';

const router = Router();

router.get('/data/:pagina/:num/:prop/:orden',VentaController.getData)
router.post('/:tipo', VentaController.crear);
router.put('/:id/:tipo', VentaController.actualizar);
router.put('/aprobar/:id/:tipo', VentaController.aprobar);
router.get('/item/:id', VentaController.resumen);
router.delete('/:id/:tipo', VentaController.borrar);
router.post('/search/lista',VentaController.search)
export default router;
