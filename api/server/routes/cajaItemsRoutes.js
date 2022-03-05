import { Router } from 'express';
import CajaItemsController from '../controllers/CajaItemsController';
import CajaController from '../controllers/CajaController';

const router = Router();
router.post('/:tipo', CajaItemsController.crear);
router.get('/item/:id', CajaController.resumenLarge);
router.get('/data/:page/:num/:prop/:orden', CajaItemsController.getData);
export default router;
