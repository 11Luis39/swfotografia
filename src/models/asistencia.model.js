import mongoose, { mongo } from 'mongoose'

const asistenciaSchema = new mongoose.Schema({
    email: String,
    evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento' },
    aceptada: Boolean
});

export default mongoose.model('Asistencia', asistenciaSchema);
