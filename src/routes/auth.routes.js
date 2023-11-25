import {Router} from 'express'
import { login, register, logout, profile, verifyToken} from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import Role from '../models/role.model.js'


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

export default router