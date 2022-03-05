import { Router } from 'express';
import ContabilidadController from '../controllers/ContabilidadController';

const router = Router();
router.post('/mayores',ContabilidadController.mayores)
router.post('/diarios',ContabilidadController.diarios)
router.post('/saldos',ContabilidadController.saldos)

export default router;


