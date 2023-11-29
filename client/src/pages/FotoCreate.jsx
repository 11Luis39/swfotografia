import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFotos } from '../context/FotoContext';
import { useEventos } from '../context/EventosContest';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth.Context';

export default function FotoCreate() {
    const { user,logout } = useAuth();
    const { register, handleSubmit } = useForm();
    const { subirFoto } = useFotos();
    const { obtenerEventosDeFotografo } = useEventos();
    const [selectedFile, setSelectedFile] = useState(null);
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const eventosDelFotografo = await obtenerEventosDeFotografo();
                setEventos(eventosDelFotografo);
            } catch (error) {
                console.error('Error al cargar eventos:', error);
            }
        };
        
        // Llamar a cargarEventos solo si el usuario está autenticado
        if (user) {
            cargarEventos();
        }
    }, [user, obtenerEventosDeFotografo]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige al usuario a la página de login
    };
    
    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('eventoId', data.eventoId);
        formData.append('fotografoId', user.id);
        formData.append('descripcion', data.descripcion);
        if (selectedFile) {
            formData.append('foto', selectedFile);
        }

        try {
            const fotoSubida = await subirFoto(formData);
            console.log('Foto subida con éxito:', fotoSubida);
             navigate('/fotografos');
        } catch (error) {
            console.error('Error al subir la foto:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Selector de Evento */}
                <div>
                <select {...register("eventoId")}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500">
                        {Array.isArray(eventos) && eventos.map((evento, index) => (
                            <option key={index} value={evento._id}>{evento}</option> // Usando index como key y value
                        ))}
                    </select>
                </div>

                {/* Mostrar el ID del Fotógrafo */}
                <div>
                    <input type="text" value={user.username} readOnly
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>

                {/* Descripción de la Foto */}
                <div>
                    <textarea placeholder="Descripción de la Foto" {...register("descripcion")} rows="3"
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>

                {/* Selector de Archivo */}
                <div>
                    <input type="file" onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>

                {/* Botón de Envío */}
                <div>
                    <button type="submit" className="w-full px-3 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                        Subir Foto
                    </button>
                </div>
            </form>
        </div>
    );
}


