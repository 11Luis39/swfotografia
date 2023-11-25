import invitado from '../models/invitado.model.js';
import User from '../models/user.model.js';


const getinvitados = async (req, res) => {
    const fotografo = await invitado.find({
        user: req.user.id
    })
    const userFound = await User.findById(req.user.id)
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        roles: userFound.roles
    })
    //res.json(eventos);

};
export { getinvitados };