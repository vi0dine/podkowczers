import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_USER,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN
} from "./user.types";

export const authUser = (email, password, mode) => {
    return {
        type: AUTH_USER,
        email: email,
        password: password,
        mode: mode
    }
};

export const authSuccess = (id, role, access, csrf) => {
    return {
        type: AUTH_SUCCESS,
        id: id,
        role: role,
        token: access,
        csrf: csrf
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

export const refreshToken = (csrf) => {
    return {
        type: REFRESH_TOKEN,
        csrf: csrf
    }
};