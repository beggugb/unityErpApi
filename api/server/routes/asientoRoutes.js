import { Router } from 'express';
import AsientoController from '../controllers/AsientoController';

const router = Router();
/** Simples */
router.get('/data/:pagina/:num/:prop/:orden',AsientoController.getData)
router.post('/:tipo', AsientoController.crear)
router.put('/:id/:tipo',AsientoController.actualizar)



export default router;
