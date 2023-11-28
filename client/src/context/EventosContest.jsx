import { createContext, useContext, useState} from "react";
import {createEventRequest} from '../api/eventos.js'

const EventosContext = createContext();

export const useEventos = () => {
    const context = useContext(EventosContext);
    if (!context) {
        throw new Error("useContext must be used within provier")
    }
    return context;
}

export function EventosProvider({ children }){
    const [eventos,setEventos] = useState ([]);

    const createEventos = async (eventos) => {
        const res = await createEventRequest(eventos)

    }



    return(
    <EventosContext.Provider value = {{
        eventos,
        createEventos,
        
    }}>
        { children }
    </EventosContext.Provider>
    );
}