import mongoose, { mongo } from 'mongoose'

const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    fecha: Date,
    organizador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
    invitados: [{
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }],
    
    fotografos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});
export default mongoose.model('Evento', eventoSchema);