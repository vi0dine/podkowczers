import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    CLEAR_NOTIFICATION,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN,
} from "./User.types";

const INITIAL_STATE = {
    id: null,
    role: null,
    token: null,
    error: null,
    message: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, id: action.id, role: action.role, token: action.token, csrf: action.csrf, loading: false };
        case AUTH_FAILED:
            return {...state, error: action.error };
        case LOGOUT_SUCCESS:
            return {...state, id: null, role: null, token: null};
        case REFRESH_TOKEN:
            return {...state, token: action.token};
        case CLEAR_NOTIFICATION:
            return {...state, message: null, error: null};
        default: return state;
    }
};

export default userReducer;