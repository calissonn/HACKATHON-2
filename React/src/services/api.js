import axios from 'axios';
export const baseURL = 'https://rickandmortyapi.com/api/';

export const Api = axios.create({
    baseURL,
})