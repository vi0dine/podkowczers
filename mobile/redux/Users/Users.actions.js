import {
    AUTH_USER,
    AUTH_USER_FAIL,
    AUTH_USER_SUCCESS,
    FETCH_USER,
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS
} from "./Users.types";

export const authUser = (email, password, navigation) => {
    return {
        type: AUTH_USER,
        email: email,
        password: password,
        navigation: navigation
    }
};

export const authUserSuccess = ({id, email, role, access_token, refresh_token}) => {
    return {
        type: AUTH_USER_SUCCESS,
        id: id,
        email: email,
        role: role,
        access_token: access_token,
        refresh_token: refresh_token
    }
};

export const authUserFail = (error) => {
    return {
        type: AUTH_USER_FAIL,
        error: error
    }
};

export const fetchUser = (id) => {
    return {
        type: FETCH_USER,
        id: id
    }
};

export const fetchUserSuccess = ({coins, tickets}) => {
    return {
        type: FETCH_USER_SUCCESS,
        coins: coins,
        tickets: tickets,
    }
};

export const fetchUserFail = (error) => {
    return {
        type: FETCH_USER_FAIL,
        error: error
    }
};