import { Router } from 'express';
import ModeloController from '../controllers/ModeloController';

const router = Router();
router.get('/items/:prop/:orden', ModeloController.getItems);
export default router;
