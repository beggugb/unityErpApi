import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController';

const router = Router();
/** Crud */
router.get('/data/:pagina/:num/:prop/:orden',CategoriaController.getData)
router.get('/item/:id',CategoriaController.getItem)
router.delete('/:id/:tipo',CategoriaController.getDelete)
router.put('/:id/:tipo',CategoriaController.actualizar)
router.post('/search/lista',CategoriaController.search)
router.post('/:tipo', CategoriaController.crear);
/**List */
router.get('/list/:name/:value', CategoriaController.getList);
router.get('/items/:prop/:orden', CategoriaController.getItems);

/**Compuestas */
export default router;
