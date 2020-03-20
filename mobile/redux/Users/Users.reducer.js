import {
    AUTH_USER, AUTH_USER_FAIL,
    AUTH_USER_SUCCESS, FETCH_USER, FETCH_USER_FAIL,
    FETCH_USER_SUCCESS, LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS
} from "./Users.types";
import {BOOK_TICKETS_SUCCESS} from "../Events/Events.types";

const INITIAL_STATE = {
    id: null,
    email: null,
    role: null,
    coins: null,
    tickets: [],
    access_token: null,
    refresh_token: null,
    processing: false,
    authenticating: false
};

export const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                processing: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                processing: false,
                authenticating: true
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                processing: false
            };
        case AUTH_USER:
            return {
                ...state,
                authenticating: true
            };
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                id: action.id,
                email: action.email,
                role: action.role,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
                authenticating: false
            };
        case AUTH_USER_FAIL:
            return {
                ...state,
                authenticating: false
            };
        case FETCH_USER:
            return {
                ...state,
                processing: true
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                coins: action.coins,
                tickets: action.tickets,
                processing: false
            };
        case FETCH_USER_FAIL:
            return {
                ...state,
                processing: false
            };
        case LOGOUT_USER_SUCCESS:
            return INITIAL_STATE;
        case BOOK_TICKETS_SUCCESS:
            return {
                ...state,
                tickets: state.tickets.concat(action.tickets)
            };
        default:
            return state
    }
};