import React, { createContext, useContext, useState, useCallback } from 'react';
import {createFotosRequest} from '../api/fotos.js'

const FotoContext = createContext();

export const useFotos = () => {
    const context = useContext (FotoContext);
    if (!context) {
        throw new Error("useFotos must be used within FotosProvider")
    }
    return context;
}

export const FotosProvider = ({ children }) => {
    const [eventos, setEventos] = useState([]);
    const [fotos, setFotos] = useState([])


    const subirFoto = async (fotoData) => {
        try {
            const res = await createFotosRequest(fotoData); 
            const fotoSubida = res.data
            setFotos(currentFotos => [...currentFotos, fotoSubida]);
            return fotoSubida; // Retorna la respuesta para manejo adicional si es necesario
        } catch (error) {
            console.error("Error al subir foto:", error);
            throw error; // Lanza el error para que pueda ser manejado por el componente
        }
    };

    return (
        <FotoContext.Provider value={{
            fotos,
            subirFoto,

        }}>
            {children}
        </FotoContext.Provider>
    );
}