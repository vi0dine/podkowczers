import axios from 'axios';
import {store} from "../redux/store";

const API_URL = 'http://localhost:4000';

export const setupAxios = () => {
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["X-CSRF-TOKEN"] = store.getState().UserState.token;
    axios.interceptors.request.use(
        function (config) {
            // dispatch(loading());
            const token = store.getState().UserState.token;
            if (token != null) {
                config.headers['X-CSRF-TOKEN'] = token;
            }
            return config;
        },
        function (err) {
            // dispatch(loaded());
            // dispatch(notifyException("Request Error"));
            return Promise.reject(err);
        }
    );

    axios.interceptors.response.use((response) => {
            const config = response.config.data && typeof response.config.data !== "object" && JSON.parse(response.config.data);
            if (config && config.message) {
                // dispatch(notifyMessage(config.message));
            }
            // dispatch(loaded());
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (!error.response) {
                // dispatch(loaded());
                // dispatch(notifyException("Server is down"));
                return Promise.reject(error);
            }

            if (error.response.status === 401 && originalRequest.url === `${API_URL}/signin`) {
                // dispatch(loaded());
                // dispatch(notifyException("OAuth Error"));
                return Promise.reject(error);
            }

            if (error.response.status === 405) {
                // dispatch(loaded());
                // dispatch(notifyException("Permissions Error"));
                return Promise.reject(error);
            }

            if (error.response.status === 404 && originalRequest.url === `${API_URL}/signin`) {
                // dispatch(loaded());
                return Promise.reject(error);
            }

            if (error.response.status === 422) {
                // dispatch(loaded());
                // dispatch(notifyException("Problem with request"));
                return Promise.reject(error);
            }

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                let res = await axios.post('/refresh');
                if (res.status === 201 || res.status === 200) {
                    // dispatch({
                    //     type: LOGIN,
                    //     token: res.data.access_token,
                    //     refresh: res.data.refresh_token,
                    //     role: res.data.role
                    // });

                    const token = store.getState().UserState.token;
                    if (token != null) {
                        axios.defaults.headers['X-CSRF-TOKEN'] = token;
                    }
                    return axios(originalRequest);
                }
            }

            // dispatch(loaded());
            // dispatch(notifyException("Internal Server Error"));
            return Promise.reject(error);
        });
};
