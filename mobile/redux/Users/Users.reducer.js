import {AUTH_USER_SUCCESS, FETCH_USER_SUCCESS} from "./Users.types";

const INITIAL_STATE = {
    id: null,
    email: null,
    role: null,
    coins: null,
    tickets: null,
    access_token: null,
    refresh_token: null
};

export const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                id: action.id,
                email: action.email,
                role: action.role,
                access_token: action.access_token,
                refresh_token: action.refresh_token
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                coins: action.coins,
                tickets: action.tickets
            };
        default:
            return state
    }
};