import { Router } from 'express';
import MarcaController from '../controllers/MarcaController';

const router = Router();
/**Crud */
router.get('/data/:pagina/:num/:prop/:orden',MarcaController.getData)
router.get('/item/:id',MarcaController.getItem)
router.delete('/:id/:tipo',MarcaController.getDelete)
router.put('/:id/:tipo',MarcaController.actualizar)
router.post('/search/lista',MarcaController.search)
router.post('/:tipo', MarcaController.crear);

router.get('/list/:name/:value', MarcaController.getList); 
/*router.get('/items/:prop/:orden', MarcaController.getItems); // items select*/
export default router;
