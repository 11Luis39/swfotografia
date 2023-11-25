import fotografo from '../models/fotografo.model.js';
import User from '../models/user.model.js';


const getFotografos = async (req, res) => {
    const fotografo = await fotografos.find({
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
export { getFotografos };
