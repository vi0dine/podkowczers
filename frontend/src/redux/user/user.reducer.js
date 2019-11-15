import {AUTH_FAILED, AUTH_START, AUTH_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN} from "./user.types";

const INITIAL_STATE = {
    id: null,
    role: null,
    token: null,
    error: null,
    loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_START:
            return {...state, ...{ loading: true, error: null }};
        case AUTH_SUCCESS:
            return {...state, id: action.id, role: action.role, token: action.token, csrf: action.csrf, loading: false };
        case AUTH_FAILED:
            return {...state,  loading: false, error: action.error };
        case LOGOUT_SUCCESS:
            return {...state, id: null, role: null, token: null};
        case REFRESH_TOKEN:
            return {...state, token: action.token};
        default: return state;
    }
};

export default userReducer;