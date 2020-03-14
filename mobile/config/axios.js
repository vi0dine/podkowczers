import axios from "axios";
import { store } from '../redux/store';
import {apiURL} from "./server";

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
            if (error.response && error.response.status === 401) {
                console.log(error)
            }
            return Promise.reject(error);
        });
};