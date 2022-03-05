import { Router } from 'express';
import CompraController from '../controllers/CompraController';

const router = Router();

router.get('/data/:pagina/:num/:prop/:orden',CompraController.getData)
router.post('/:tipo', CompraController.crear);
router.put('/:id/:tipo', CompraController.actualizar);
router.put('/aprobar/:id/:tipo', CompraController.aprobar);
router.get('/item/:id', CompraController.resumen);
router.delete('/:id/:tipo', CompraController.borrar);
router.post('/search/lista',CompraController.search)

export default router;
