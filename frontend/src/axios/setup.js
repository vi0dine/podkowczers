import axios from 'axios';
import store from "../redux/store";

const API_URL = 'http://localhost:4000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': store.getState().token
    }
});

export default api;