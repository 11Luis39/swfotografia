import {Router} from 'express'
import  {registrarAsistencia}  from '../controllers/asistencia.controller.js';

const router = Router();

router.post('/validar-qr', registrarAsistencia);

export default router;
