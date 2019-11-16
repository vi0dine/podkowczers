import {SET_LOADED, SET_LOADING} from "./app.types";

const INITIAL_STATE = {
    loading: false
};

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_LOADED:
            return {
                ...state,
                loading: false
            };
        default:
            return {...INITIAL_STATE};
    }
};

export default appReducer;