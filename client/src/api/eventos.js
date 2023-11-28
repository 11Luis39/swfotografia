import axios from './axios'


export const createEventRequest = (eventos) => axios.post(`/eventos`, eventos);