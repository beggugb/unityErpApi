import { Router } from 'express';
import EmpresaController from '../controllers/EmpresaController';

const router = Router();
/** Simples */
router.get('/item/:id',EmpresaController.getItem)
router.put('/:id/:tipo',EmpresaController.actualizar)

/** Compuestos */


export default router;
