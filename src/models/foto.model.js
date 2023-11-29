import mongoose, { mongo } from 'mongoose'

const fotoSchema = new mongoose.Schema({
    eventoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Evento' // Asegúrate de que este sea el nombre de tu modelo de Evento
    },
    fotografoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Fotografo' // Cambia esto por el nombre de tu modelo de Fotógrafo, si tienes uno
    },
    url: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    descripcion: {
        type: String,
        default: ''
    }
});
export default mongoose.model('Foto', fotoSchema);