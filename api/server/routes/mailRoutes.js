import { Router } from 'express';
import MailController from '../controllers/MailController';

const router = Router();
/**Enviar Cotización */
router.get('/cotizacion/:id', MailController.enviarCotizacion);
router.get('/compra/:id', MailController.enviarCompra);

export default router;
