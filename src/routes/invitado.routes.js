import express from 'express';
import {getinvitados} from '../controllers/invitado.controller.js';
import {authRequired, isInvitado} from '../middlewares/validateToken.js'

const router = express.Router();

router.get('/invitados', authRequired, isInvitado, getinvitados);

export default router;