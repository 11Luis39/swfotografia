import Evento from '../models/evento.model.js';
import User from '../models/user.model.js';


const getEventos = async (req, res)=>{
    const eventos = await Evento.find({
        user: req.user.id
    })
    const userFound = await User.findById(req.user.id)
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        roles: userFound.roles
    })


};

const crearEvento = async (req, res) => {
    try {
        const { nombre, descripcion, fecha, invitados, fotografos } = req.body;
        const nuevoEvento = new Evento({
            nombre,
            descripcion,
            fecha,
            organizador: req.user._id,
            invitados,
            fotografos
        });

        await nuevoEvento.save();
        res.status(201).json(nuevoEvento);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el evento", error });
    }
};

export { crearEvento, getEventos };
