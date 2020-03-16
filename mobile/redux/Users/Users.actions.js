import {
    AUTH_USER,
    AUTH_USER_FAIL,
    AUTH_USER_SUCCESS,
    FETCH_USER,
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS
} from "./Users.types";

export const registerUser = (email, password, navigation) => {
    return {
        type: REGISTER_USER,
        email: email,
        password: password,
        navigation: navigation
    }
};

export const registerUserSuccess = () => {
    return {
        type: REGISTER_USER_SUCCESS
    }
};

export const registerUserFail = (error) => {
    return {
        type: REGISTER_USER_FAIL,
        error: error
    }
};

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

export const logoutUser = (navigation) => {
    return {
        type: LOGOUT_USER,
        navigation: navigation
    }
};

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS
    }
};

export const logoutUserFail = (error) => {
    return {
        type: LOGOUT_USER_FAIL,
        error: error
    }
};