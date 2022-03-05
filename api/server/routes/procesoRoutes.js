import { Router } from 'express';
import ProcesoController from '../controllers/ProcesoController';

const router = Router();
/** Simples */
router.get('/data/:pagina/:num/:prop/:orden',ProcesoController.getData)
/*router.post('/:tipo', PucController.crear)
router.put('/:id/:tipo',PucController.actualizar)
router.get('/item/:id', PucController.getItem);
router.delete('/:id/:tipo',PucController.getDelete)
router.post('/search/lista', PucController.getSearch)
router.get('/list/:name/:value', PucController.getList);*/
export default router;
