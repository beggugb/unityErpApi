import { Router } from 'express';
import ArticuloController from '../controllers/ArticuloController';


const router = Router();
router.get('/data/:pagina/:num/:prop/:orden',ArticuloController.getData)
router.get('/item/:id',ArticuloController.getItem)
router.post('/search/lista', ArticuloController.getSearch)
router.post('/:tipo', ArticuloController.crear);
router.put('/:id/:tipo',ArticuloController.actualizar)
router.get('/item/copiar/:id',ArticuloController.setCopiar)
router.delete('/:id/:tipo',ArticuloController.getDelete)
/*router.get('/list/:name', ArticuloController.lista);*/



export default router;
