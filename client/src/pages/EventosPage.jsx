import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth.Context';
import { useEventos } from '../context/EventosContest';
import QRCodeReader from 'qrcode-reader';

export default function Eventos() {
    const { user, logout } = useAuth();
    const { eventos, fetchEventos, registrarInvitacion } = useEventos();
    const navigate = useNavigate();
    const qr = new QRCodeReader();

    qr.callback = (error, result) => {
        if (error) {
            console.error('Error al escanear el QR:', error);
            alert('Error al escanear el QR desde la imagen');
            return;
        }
        try {
            const qrData = JSON.parse(result.result);
            registrarInvitacion(qrData);
        } catch (e) {
            console.error('Error al parsear el contenido del QR:', e);
        }
    };

    const handleImageUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                // Decodifica la imagen del QR aquí
                qr.decode(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchEventos(user.id);
        }
    }, [user, fetchEventos]);

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige al usuario a la página de login
    };

    const irACrearEvento = () => navigate('/EventosCreate');
    return (
        <div className="bg-gray-800 min-h-screen p-5">
            <h1 className="text-3xl font-bold mb-5">Mis Eventos</h1>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Cerrar Sesión
            </button>
            <button onClick={irACrearEvento} className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Crear Nuevo Evento
            </button>

            <div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventos.length > 0 ? (
                    eventos.map((evento, index) => (
                        <div key={evento._id || index} className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{evento.nombre}</h2>
                            <p className="text-gray-300">{evento.descripcion}</p>
                            <p className="text-gray-400"><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay eventos disponibles.</p>
                )}
            </div>
        </div>
    );
}



