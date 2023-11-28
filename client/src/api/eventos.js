import axios from './axios'

export const getEventRequest = (userId) => axios.get(`/eventos/${userId}`);
export const createEventRequest = (eventos) => axios.post(`/eventos`, eventos);
