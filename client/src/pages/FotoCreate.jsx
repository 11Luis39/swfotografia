import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFotos } from '../context/FotoContext';
import { useNavigate } from 'react-router-dom';

export default function FotoCreate() {
    const { register, handleSubmit } = useForm();
    const { subirFoto } = useFotos();
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        try {
            if (!selectedFile) {
                alert("Por favor, selecciona una foto para subir.");
                return;
            }

            const formData = new FormData();
            formData.append('foto', selectedFile);
            formData.append('eventoId', data.eventoId);
            formData.append('fotografoId', data.fotografoId);
            formData.append('descripcion', data.descripcion);

            await subirFoto(formData);
            navigate('/fotografos'); // Actualiza con la ruta adecuada
        } catch (error) {
            console.error('Error al subir la foto:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input type="text" placeholder="ID del Evento" {...register("eventoId")}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <input type="text" placeholder="ID del Fotógrafo" {...register("fotografoId")}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <textarea placeholder="Descripción de la Foto" {...register("descripcion")} rows="3"
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div>
                    <input type="file" onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <button type="submit" className="w-full px-3 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                        Subir Foto
                    </button>
                </div>
            </form>
        </div>
    );
}

