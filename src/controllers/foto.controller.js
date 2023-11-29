import foto from '../models/foto.model.js';
import Evento from '../models/evento.model.js'
import { uploadImage } from '../libs/cloudinary.js'
import fs from 'fs';


// controlador para Subir una nueva foto
const subirFoto = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subieron archivos.');
        }

        // 'foto' es el nombre del campo de entrada en el formulario de subida
        const archivoFoto = req.files.foto;

        // Subir archivo a Cloudinary
        const result = await uploadImage(archivoFoto.tempFilePath);

        // Extraer información adicional si es necesario
        const { eventoId, fotografoId, descripcion } = req.body;

        // Crear una nueva instancia del modelo 'foto'
        const nuevaFoto = new foto({
            eventoId,
            fotografoId,
            url: result.url, // URL devuelta por Cloudinary
            descripcion
        });

        // Guardar la instancia en la base de datos
        await nuevaFoto.save();

        // Eliminar archivo temporal creado por 'express-fileupload'
        fs.unlinkSync(archivoFoto.tempFilePath);

        res.status(201).json({ mensaje: 'Foto subida con éxito', foto: nuevaFoto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al subir la foto", error });
    }
};


// controlador para obtemer fotos de un evento
const obtenerFotosEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const fotos = await foto.find({ eventoId });

        res.status(200).json(fotos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las fotos", error });
    }
};

// controlador para actuzalizar fotos de un evento
const actualizarFoto = async (req, res) => {
    try {
        const { fotoId } = req.params;
        const { url, descripcion } = req.body;

        const fotoActualizada = await foto.findByIdAndUpdate(
            fotoId,
            { url, descripcion },
            { new: true } // Esto devuelve el documento actualizado
        );

        if (!fotoActualizada) {
            return res.status(404).json({ mensaje: 'Foto no encontrada' });
        }

        res.status(200).json({ mensaje: 'Foto actualizada con éxito', foto: fotoActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la foto', error });
    }
};

// controlador para eliminar fotos de un evento
const eliminarFoto = async (req, res) => {
    try {
        const { fotoId } = req.params;

        const fotoEliminada = await foto.findByIdAndRemove(fotoId);

        if (!fotoEliminada) {
            return res.status(404).json({ mensaje: 'Foto no encontrada' });
        }

        res.status(200).json({ mensaje: 'Foto eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la foto', error });
    }
};

export { subirFoto, obtenerFotosEvento, actualizarFoto, eliminarFoto };
