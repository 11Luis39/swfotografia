import axios from './axios'

const API_URL = 'http://localhost:3000/api/roles';

export async function getRoles() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        return [];
    }
}

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get(`/verify`);