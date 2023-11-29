import express from 'express';
import {subirFoto, obtenerFotosEvento, actualizarFoto, eliminarFoto } from '../controllers/foto.controller.js';
import {authRequired, isFotografo} from '../middlewares/validateToken.js'

const router = express.Router();
// Ruta para subir una nueva foto
router.post('/fotos',authRequired, isFotografo, subirFoto);

// Ruta para obtener fotos de un evento
router.get('/fotos/:eventoId',authRequired,isFotografo, obtenerFotosEvento);

// Ruta para actualizar una foto específica
router.put('/fotos/:fotoId',authRequired, isFotografo, actualizarFoto);

// Ruta para eliminar una foto específica
router.delete('/fotos/:fotoId',authRequired,isFotografo, eliminarFoto);

export default router;
