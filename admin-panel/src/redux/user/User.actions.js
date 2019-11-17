import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_USER,
    CLEAR_NOTIFICATION,
    LOGOUT,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN
} from "./User.types";

export const authUser = (email, password) => {
    return {
        type: AUTH_USER,
        email: email,
        password: password
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
        type: LOGOUT
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

export const clearNotification = () => {
    return {
        type: CLEAR_NOTIFICATION
    }
};