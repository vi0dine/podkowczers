import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_USER, CLEAR_NOTIFICATION, FETCH_USER, FILL_PROFILE,
    LOGOUT_START,
    LOGOUT_SUCCESS, MAKE_RESERVATION,
    REFRESH_TOKEN, RESERVATION_FAILED, RESERVATION_SUCCESS
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

export const getUser = (id) => {
    return {
        type: FETCH_USER,
        id: id
    }
};

export const fillProfile = (email, avatar, coins, reservations) => {
    return {
        type: FILL_PROFILE,
        email: email,
        avatar: avatar,
        coins: coins,
        reservations: reservations
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

export const makeReservation = (id, tickets) => {
    return {
        type: MAKE_RESERVATION,
        id: id,
        tickets: tickets
    }
};

export const reservationSuccess = (message) => {
    return {
        type: RESERVATION_SUCCESS,
        message: message
    }
};

export const reservationFail = (error) => {
    return {
        type: RESERVATION_FAILED,
        error: error
    }
};

export const clearNotification = () => {
    return {
        type: CLEAR_NOTIFICATION
    }
};