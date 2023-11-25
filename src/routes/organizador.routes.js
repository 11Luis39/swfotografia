import express from 'express';
import {crearEvento,getEventos} from '../controllers/evento.controller.js';
import {authRequired, isOrganizador} from '../middlewares/validateToken.js'

const router = express.Router();

router.get('/eventos', authRequired,isOrganizador, getEventos);
router.post('/eventos',authRequired,isOrganizador,crearEvento);

export default router;
