import {Router} from 'express'
import { login, register, logout, profile, verifyToken} from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import Role from '../models/role.model.js'
import User from '../models/user.model.js'
//import multer from 'multer';
//const upload = multer({ dest: 'upload/' });


const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);
 
router.get ("/profile", authRequired, profile );

router.get('/verify', verifyToken);

router.get('/roles', async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/fotografos', async (req, res) => {
    try {
        const rolFotografo = await Role.findOne({ name: 'Fotografo' });
        if (!rolFotografo) {
            return res.status(404).send('Rol de fotógrafo no encontrado');
        }

        const Fotografos = await User.find({ roles: rolFotografo._id });
        res.json(Fotografos);
    } catch (error) {
        console.error('Error al obtener fotografos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default router