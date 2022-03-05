import { Router } from 'express';
import AlmacenController from '../controllers/AlmacenController';

const router = Router();
/** Simples */
router.post('/search/lista',AlmacenController.listaStock)
router.get('/list/:name/:value', AlmacenController.getList);

/** Compuestos */


export default router;
