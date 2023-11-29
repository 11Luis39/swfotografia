import { createContext, useContext, useState, useEffect , useCallback} from "react";
import { createEventRequest, getEventRequest } from '../api/eventos.js'
import { useNavigate } from 'react-router-dom';



const EventosContext = createContext();

export const useEventos = () => {
    const context = useContext(EventosContext);
    if (!context) {
        throw new Error("useContext must be used within provier")
    }
    return context;
}

export function EventosProvider({ children }) {
    const [eventos, setEventos] = useState([]);

    

    const fetchEventos = useCallback (async (userId) => {
        try {
            const res = await getEventRequest(userId);
            setEventos(res.data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    },[setEventos]);

    




    const createEventos = async (eventos) => {
        try {
            console.log (eventos)
            const res = await createEventRequest(eventos)
            
            const eventoCreado = res.data;
            // Actualizar la lista de eventos agregando el nuevo
            setEventos(currentEventos => [...currentEventos, eventoCreado]);

        } catch (error) {
            console.error("Error al crear evento:", error);
        }

    }

    return (
        <EventosContext.Provider value={{
            eventos,
            createEventos,
            fetchEventos,

        }}>
            {children}
        </EventosContext.Provider>
    );
}