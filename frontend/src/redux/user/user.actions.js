import {
    AUTH_FAILED,
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_USER,
    LOGOUT_START,
    LOGOUT_SUCCESS
} from "./user.types";

export const authUser = (email, password, mode) => {
    return {
        type: AUTH_USER,
        email: email,
        password: password,
        mode: mode
    }
};

export const authStart = () => {
    return {
        type: AUTH_START
    }
};

export const authSuccess = (id, role, token) => {
    return {
        type: AUTH_SUCCESS,
        id: id,
        role: role,
        token: token
    }
};

export const authFail = (error) => {
    return {
        type: AUTH_FAILED,
        error: error
    }
};

export const logout = () => {
    return {
        type: LOGOUT_START
    }
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};