import {AUTH_FAILED, AUTH_START, AUTH_SUCCESS, LOGOUT_SUCCESS} from "./user.types";

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
            return {...state, id: action.id, role: action.role, token: action.token, loading: false };
        case AUTH_FAILED:
            return {...state,  loading: false, error: action.error };
        case LOGOUT_SUCCESS:
            return {...state, id: null, role: null, token: null};
        default: return state;
    }
};

export default userReducer;