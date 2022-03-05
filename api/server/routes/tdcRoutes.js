import { Router } from 'express';
import TdcController from '../controllers/TdcController';

const router = Router();
/**Crud */
router.get('/data/:pagina/:num/:prop/:orden',TdcController.getData)
router.get('/item/:id',TdcController.getItem)
router.delete('/:id/:tipo',TdcController.getDelete)
router.put('/:id/:tipo',TdcController.actualizar)
router.post('/search/lista',TdcController.search)
router.post('/:tipo', TdcController.crear);

export default router;
