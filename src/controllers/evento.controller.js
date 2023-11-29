import Evento from '../models/evento.model.js';
import User from '../models/user.model.js';
import Role from '../models/role.model.js'
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import { uploadImage } from '../libs/cloudinary.js'

const getEventos = async (req, res) => {
    try {
        const organizadorId = req.params.userId; // Obtiene el ID del organizador de los parámetros de ruta
        const eventos = await Evento.find({ organizador: organizadorId })
            .populate('organizador', 'nombre email'); // Omitir o modificar 'populate' según tus necesidades

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron eventos para el organizador.' });
        }

        return res.json(eventos);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        return res.status(500).json({ mensaje: 'Error al obtener eventos', error });
    }
};




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soloalaaalaz@gmail.com',
        pass: 'kbhn rusc xbsj qcxi',
    },
});


const generarQR = async (texto) => {
    try {
        const qrFileName = `temp_qr_${Date.now()}.png`;
        const qrFilePath = `./upload/${qrFileName}`; // Cambiado de ./temp/ a ./upload/
        await QRCode.toFile(qrFilePath, texto);
        return qrFilePath;
    } catch (err) {
        console.error('Error al generar código QR:', err);
        throw err;
    }
};


const crearEvento = async (req, res) => {
    try {
        const { nombre, descripcion, fecha, organizador, invitados, fotografosIds  } = req.body;
        //const rolFotografo = await Role.findOne({ name: 'fotografo' });
        //const fotografos = await User.find({ roles: rolFotografo._id });

        if (invitados && invitados.some(inv => !inv.nombre || !inv.email)) {
            return res.status(400).send('Todos los invitados deben tener un nombre y un email.');
        }

        const fotografosSeleccionados = await User.find({ 
            '_id': { $in: fotografosIds },
            'roles': { $in: [await Role.findOne({ name: 'fotografo' })._id] }
        });

        const nuevoEvento = new Evento({ nombre, descripcion, fecha, organizador, invitados, fotografos:fotografosIds });
        console.log(nuevoEvento);

        await nuevoEvento.save();

        const enviarInvitaciones = async (personas) => {
            await Promise.all(personas.map(async (persona) => {
                const qrFilePath = await generarQR(`${nuevoEvento._id}/${persona.email}`);
                const qrCloudinaryResult = await uploadImage(qrFilePath);
                const qrCodeUrl = qrCloudinaryResult.url;

                const mailOptions = {
                    to: persona.email,
                    subject: `Invitación al evento: ${nombre}`,
                    html: `
                    <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                        <h1 style="color: #4A90E2;">Detalles del Evento</h1>
                        <p style="font-size: 16px;"><strong>Evento:</strong> ${nombre}</p>
                        <p style="font-size: 16px;"><strong>Descripción:</strong> ${descripcion}</p>
                        <p style="font-size: 16px;"><strong>Fecha:</strong> ${fecha}</p>
                        <div style="margin: 20px 0;">
                            <img src="${qrCodeUrl}" alt="Código QR para registro de asistencia" style="max-width: 200px; border: 1px solid #ddd; padding: 10px;">
                        </div>
                        <p style="font-size: 16px;">Por favor, presenta este código QR en el evento para registrar tu asistencia.</p>
                    </div>
                `};

                try {
                    await transporter.sendMail(mailOptions);
                    console.log('Invitación enviada a:', persona.email);
                } catch (error) {
                    console.error('Error al enviar la invitación a', persona.email, ':', error);
                }
            }));
        };

        // Enviar invitaciones a los invitados especificados
        if (invitados && invitados.length > 0) {
            await enviarInvitaciones(invitados);
        }

        // Enviar invitaciones a los fotógrafos
        if (fotografosSeleccionados && fotografosSeleccionados.length > 0) {
            const datosFotografos = fotografosSeleccionados.map(fotografo => ({
                nombre: fotografo.username, 
                email: fotografo.email
            }));
            await enviarInvitaciones(datosFotografos, true);
        }


        res.status(201).json({ mensaje: 'Evento creado y correos electrónicos enviados' });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el evento", error });
    }
};

export { crearEvento, getEventos };
