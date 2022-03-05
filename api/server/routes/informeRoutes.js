import { Router } from 'express';
import InformesController from '../controllers/InformesController';

const router = Router();
router.post('/consolidado',InformesController.consolidado)
router.post('/categorias',InformesController.categorias)

router.post('/movimientos',InformesController.general)
router.post('/existencias',InformesController.existencias)
router.post('/cajas',InformesController.cajas)
router.post('/pagos',InformesController.pagos)

export default router;


