import axios from 'axios';

const api = axios.create({
    baseURL: 'https://alimentacao-backend.herokuapp.com'
});

export default api;