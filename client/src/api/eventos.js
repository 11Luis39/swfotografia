import axios from './axios'



const API_URL = 'http://localhost:3000/api/fotografos';

export async function getFotografos() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los fotografos:', error);
        return [];
    }
}
export const getEventRequest = (userId) => axios.get(`/eventos/${userId}`);
export const createEventRequest = (eventos) => axios.post(`/eventos`, eventos);
export const RegisterUserEventRequest = (Qr) => axios.post(`/validar-qr`, Qr);
export const obtenerEventosRequest = (fotografoId)=> axios.get(`/eventos-de-fotografo`);