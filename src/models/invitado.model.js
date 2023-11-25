import mongoose, { mongo } from 'mongoose'

const invitadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    fecha: Date,

});
export default mongoose.model('Invitado', invitadoSchema);