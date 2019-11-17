import {
    AUTH_FAILED,
    AUTH_SUCCESS, CLEAR_NOTIFICATION, FILL_PROFILE,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN,
    RESERVATION_FAILED,
    RESERVATION_SUCCESS
} from "./user.types";

const INITIAL_STATE = {
    id: null,
    role: null,
    avatar: null,
    email: null,
    coins: null,
    reservations: null,
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
        case FILL_PROFILE:
            return {...state, email: action.email, avatar: action.avatar, coins: action.coins, reservations: action.reservations};
        case LOGOUT_SUCCESS:
            return {...state, id: null, role: null, token: null};
        case REFRESH_TOKEN:
            return {...state, token: action.token};
        case RESERVATION_SUCCESS:
            return {...state, message: action.message};
        case RESERVATION_FAILED:
            return {...state, error: action.error};
        case CLEAR_NOTIFICATION:
            return {...state, message: null, error: null};
        default: return state;
    }
};

export default userReducer;