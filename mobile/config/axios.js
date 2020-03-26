import axios from "axios";
import { store } from '../redux/store';
import {apiURL} from "./server";
import {authUser, authUserSuccess} from "../redux/Users/Users.actions";

export const setupAxios = () => {
    axios.defaults.baseURL = apiURL();
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.interceptors.request.use(
        function (config) {
            const token = store.getState().UserState.access_token;
            if (token != null) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (err) {
            return Promise.reject(err);
        }
    );

    axios.interceptors.response.use((response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                let res = await axios.post('/oauth/token',
                    {
                        "refresh_token": store.getState().UserState.refresh_token,
                        "grant_type": "refresh_token"
                    });
                if (res.status === 201 || res.status === 200) {
                    store.dispatch(authUserSuccess(res.data));

                    const token = store.getState().UserState.access_token;
                    if (token != null) {
                        axios.defaults.headers.authorization = `Bearer ${token}`;
                    }
                    return axios(originalRequest);
                }
            }

            return Promise.reject(error);
        });
};