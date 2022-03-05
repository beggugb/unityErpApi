import { Router } from 'express';
import ProveedorController from '../controllers/ProveedorController';

const router = Router();
/** Simples */
router.get('/data/:pagina/:num/:prop/:orden',ProveedorController.getData)
router.get('/item/:id',ProveedorController.getItem)
router.put('/:id/:tipo',ProveedorController.actualizar)
router.post('/search/lista',ProveedorController.search)
router.get('/item/copiar/:id',ProveedorController.setCopiar)
router.delete('/:id/:tipo',ProveedorController.getDelete)
/** Compuestos */
router.post('/:tipo', ProveedorController.crear);
export default router;
