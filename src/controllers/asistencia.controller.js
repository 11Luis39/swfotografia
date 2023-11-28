import Asistencia from '../models/asistencia.model.js';
import Evento from '../models/evento.model.js'

const registrarAsistencia = async (req, res) => {
    try {
        const { qrData } = req.body;
        // Extraer datos del QR
        const { eventoId, email } = qrData;
        //const { eventoId, email } = req.body;

        const evento = await Evento.findOne({ _id: eventoId });
        if (!evento) {
            return res.status(404).send('Evento no encontrado');
        }
        const invitacion = evento.invitados.find((inv) => inv.email === email);

        if (!invitacion) {
            return res.status(404).send('Invitación no encontrada en el evento');
        }

        // Registrar la asistencia
        const asistencia = new Asistencia({
            evento: eventoId,
            email: email,
            aceptada: true // Otra información relacionada con la asistencia si es necesario
        });;
        await asistencia.save();
        console.log(asistencia)

        res.json({ mensaje: "Asistencia registrada y validada con éxito" });
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ mensaje: "Error al registrar la asistencia", error });
    }
};

export { registrarAsistencia };
