import React from 'react';
import { useAuth } from '../context/Auth.Context';
import { useForm, useFieldArray } from 'react-hook-form'; // Corrección aquí
import { useEventos } from '../context/EventosContest';

export default function EventosCreate() {
    const { user } = useAuth();
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            invitados: [{ nombre: '', email: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "invitados"
    });
    const { createEventos } = useEventos();

    const onSubmit = async (data) => {
        try {
            await createEventos({ ...data, organizador: user.id });
            reset();
        } catch (error) {
            console.error('Error al crear evento:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input type="text" placeholder="Nombre" {...register("nombre")} autoFocus
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <textarea placeholder="Descripción" {...register("descripcion")} rows="3"
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div>
                    <input type="date" {...register("fecha")}
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                </div>

                <h2 className="text-lg text-white font-semibold">Invitados</h2>
                <div className="space-y-2">
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex gap-2">
                            <input type="text" placeholder="Nombre del Invitado" {...register(`invitados.${index}.nombre`)}
                                className="flex-1 px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                            <input type="email" placeholder="Email del Invitado" {...register(`invitados.${index}.email`)}
                                className="flex-1 px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:border-blue-500" />
                            <button type="button" onClick={() => remove(index)}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => append({ nombre: '', email: '' })}
                    className="w-full px-3 py-2 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                    Agregar Invitado
                </button>

                <div>
                    <button type="submit" className="w-full px-3 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                        Crear Evento
                    </button>
                </div>
            </form>
        </div>

    );
}

