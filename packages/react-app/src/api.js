import axios from 'axios';

const api = axios.create({
    baseURL: 'http://nestjs'
});

export default api;