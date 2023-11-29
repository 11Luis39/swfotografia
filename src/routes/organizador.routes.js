import express from 'express';
import { crearEvento, getEventos ,obtenerEventosDeFotografo } from '../controllers/evento.controller.js';
import { authRequired, isOrganizador } from '../middlewares/validateToken.js'


const router = express.Router();


router.post('/eventos', authRequired, isOrganizador, crearEvento);
router.get('/eventos/:userId', authRequired, isOrganizador, getEventos);

router.get('/eventos-de-fotografo', authRequired, obtenerEventosDeFotografo);

export default router;
