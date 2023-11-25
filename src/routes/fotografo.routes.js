import express from 'express';
import {getFotografos} from '../controllers/fotografo.controller.js';
import {authRequired, isFotografo} from '../middlewares/validateToken.js'

const router = express.Router();

router.get('/fotografos', authRequired, isFotografo, getFotografos);

export default router;
