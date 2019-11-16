import {SET_LOADED, SET_LOADING} from "./app.types";

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
};

export const setLoaded = () => {
    return {
        type: SET_LOADED
    }
};