import {AUTH_FAILED, AUTH_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN} from "./user.types";

const INITIAL_STATE = {
    id: null,
    role: null,
    token: null,
    error: null,
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
        default: return state;
    }
};

export default userReducer;