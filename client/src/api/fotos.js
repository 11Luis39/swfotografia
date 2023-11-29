import axios from './axios'


export const createFotosRequest = (fotos) => axios.post(`/fotos`, fotos);