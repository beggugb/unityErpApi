import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import KeyToken from './keyToken'
const router = Router();
router.post('/login', UsuarioController.login);
router.get('/list/:prop/:orden',KeyToken,UsuarioController.getItems);
export default router;
