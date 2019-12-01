import axios from "axios";
import { store } from "../redux/store";

export const API_URL = "http://51.178.16.104:4000";

export const setupAxios = () => {
  axios.defaults.baseURL = API_URL;

  const securedAxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

  const plainAxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

  axios.interceptors.request.use(config => {
    // store.dispatch(setLoading());
    return config;
  });

  axios.interceptors.response.use(
    response => {
      // store.dispatch(setLoaded());
      return response;
    },
    error => {
      // store.dispatch(setLoaded());
      return Promise.reject(error);
    }
  );

  securedAxiosInstance.interceptors.request.use(config => {
    // store.dispatch(setLoading());
    const method = config.method.toUpperCase();
    if (method !== "OPTIONS") {
      config.headers = {
        ...config.headers,
        "X-CSRF-TOKEN": store.getState().UserState.csrf,
        Authorization: store.getState().UserState.token
      };
    }
    return config;
  });

  securedAxiosInstance.interceptors.response.use(
    response => {
      // store.dispatch(setLoaded());
      console.log(response);
      return response;
    },
    error => {
      if (
        error.response &&
        error.response.config &&
        error.response.status === 401
      ) {
        return plainAxiosInstance
          .post(
            "/api/v1/refresh",
            {},
            {
              headers: {
                "X-CSRF-TOKEN": store.getState().UserState.csrf,
                Authorization: store.getState().UserState.token
              }
            }
          )
          .then(response => {
            // store.dispatch(refreshToken(response.data.csrf.csrf));

            let retryConfig = error.response.config;
            retryConfig.headers[
              "X-CSRF-TOKEN"
            ] = store.getState().UserState.csrf;
            retryConfig.headers[
              "Authorization"
            ] = store.getState().UserState.token;
            return plainAxiosInstance.request(retryConfig);
          })
          .catch(error => {
            // store.dispatch(logout());
            // store.dispatch(setLoaded());
            return Promise.reject(error);
          });
      } else {
        // store.dispatch(setLoaded());
        return Promise.reject(error);
      }
    }
  );

  return {
    axiosSecured: securedAxiosInstance,
    axiosPlain: plainAxiosInstance
  };
};
