import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import Role from '../models/role.model.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import {uploadImage} from '../libs/cloudinary.js'



export const register = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        console.log(req.files);
        let profilePictureUrls = [];
        if (req.files && req.files.profilePictures) {
            const files = Array.isArray(req.files.profilePictures) 
                ? req.files.profilePictures 
                : [req.files.profilePictures];
        
            for (const file of files) {
                const result = await uploadImage(file.tempFilePath); // Asumiendo que esta función devuelve la respuesta de Cloudinary
                profilePictureUrls.push(result.url);  // Guarda solo la URL de la imagen
            }
        }
        

        let foundRoles;
        if (roles) {
            foundRoles = await Role.find({ name: { $in: roles } });
        } else {
            const defaultRole = await Role.findOne({ name: "Invitado" });
            foundRoles = [defaultRole];
        }

        if (foundRoles.some(role => ['organizador', 'invitado'].includes(role.name)) && profilePictureUrls.length !== 3) {
            return res.status(400).send('Organizadores e invitados deben subir exactamente tres fotos de perfil.');
        }

        const user = new User({
            username,
            email,
            password: hash,
            profilePictures: profilePictureUrls,
            roles: foundRoles.map(role => role._id)
        });

        const userFound = await user.save();

        const userWithRoles = await User.findById(userFound._id)
            .populate('roles', 'name')
            .exec();

        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            roles: userWithRoles.roles.map(role => role.name),
            profilePictures: userFound.profilePictures
        });

    } catch (error) {
        console.error(error); // Imprimir el error en la consola para depuración
        res.status(500).send('Error en el servidor');
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email });
        const userWithRoles = await User.findById(userFound._id)
            .populate('roles', 'name')
            .exec();

        if (!userFound) return res.status(400).json({ message: "user not found" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "contraseña incorrecta" });

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            roles: userWithRoles.roles.map(role => role.name)

        });

    } catch (error) {
        res.status(500).send('Error en el login')
    }

}

export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "no autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (err, decodedToken) => {
        if (err) return res.status(401).json({ message: "no autorizado" });
        

        const userFound = await User.findById(decodedToken.id);
        if (!userFound) return res.status(401).json({ message: "no autorizado" });

        const userWithRoles = await User.findById(userFound._id)
        .populate('roles', 'name')
        .exec();
        

        return res.json({
            id: userFound._id,
            username: userFound.username, 
            email: userFound.email,
            roles: userWithRoles.roles.map(role => role.name),
            profilePictures: userFound.profilePictures
        });
    });
}
