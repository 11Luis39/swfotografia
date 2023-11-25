import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'

export const authRequired = (req, res, next ) => {
        const { token } = req.cookies;

        if (!token)
        return res.status(401).json ({ message: "no hay token, authorization denied"});

        jwt.verify(token,TOKEN_SECRET, (err, user)  => {
            if (err) return res.status(403).json ({ message: "token invalido"});

            req.user = user

            next();
        })

}

export const isFotografo = async (req, res, next) =>{

    if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name == "Fotografo") {
                next();
                return;
            }  
    }
            res.status(403).json({ message: "Acceso denegado. Se requiere rol de Fotografo" });
        
    } catch (error) {
        console.error("Error en isFotografo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const isOrganizador = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name == "Organizador") {
                next();
                return;
            }  
    }
            res.status(403).json({ message: "Acceso denegado. Se requiere rol de organizador" });
        
    } catch (error) {
        console.error("Error en isOrganizador:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



export const isInvitado = async (req, res, next) =>{
    if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name == "Invitado") {
                next();
                return;
            }  
    }
            res.status(403).json({ message: "Acceso denegado. Se requiere rol de invitado" });
        
    } catch (error) {
        console.error("Error en isInvitado:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}
