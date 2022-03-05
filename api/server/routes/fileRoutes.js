import { Router } from 'express';
import FileController from '../controllers/FileController';

const router = Router();
router.put('/articulo/item/:id', FileController.articulos);
router.put('/proveedor/item/:id', FileController.proveedores);
router.put('/cliente/item/:id', FileController.clientes);
export default router;

