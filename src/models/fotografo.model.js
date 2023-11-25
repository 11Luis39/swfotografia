import mongoose, { mongo } from 'mongoose'

const fotografoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    fecha: Date,

});
export default mongoose.model('Fotografo', fotografoSchema);