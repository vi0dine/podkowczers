import axios from 'axios';
import {store} from "../redux/store";
import {logout, refreshToken} from "../redux/user/user.actions";

const API_URL = 'http://localhost:4000';

export const setupAxios = () => {
    axios.defaults.baseURL = API_URL;

    const securedAxiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const plainAxiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });

    securedAxiosInstance.interceptors.request.use(
        config => {
            const method = config.method.toUpperCase();
            if (method !== 'OPTIONS' && method !== 'GET') {
                config.headers = {
                    ...config.headers,
                    'X-CSRF-TOKEN': store.getState().UserState.csrf,
                    'Authorization': store.getState().UserState.token
                }
            }
            return config;
        }
    );

    securedAxiosInstance.interceptors.response.use(null, (error) => {
        if (error.response && error.response.config && error.response.status === 401) {
            return plainAxiosInstance.post('/refresh', {},
                { headers: {
                    'X-CSRF-TOKEN': store.getState().UserState.csrf}})
                .then(response => {
                    store.dispatch(refreshToken(response.data.csrf));

                    let retryConfig = error.response.config;
                    retryConfig.headers['X-CSRF-TOKEN'] = store.getState().UserState.csrf;
                    retryConfig.headers['Authorization'] = store.getState().UserState.token;
                    return plainAxiosInstance.request(retryConfig);
                }).catch(error => {
                    console.log(error);
                    // store.dispatch(logout());
                    return Promise.reject(error)
                })
        } else {
            return Promise.reject(error)
        }
    });

    return {
        axiosSecured: securedAxiosInstance,
        axiosPlain: plainAxiosInstance
    }
};
