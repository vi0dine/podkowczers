import {
    ADD_COIN, ADD_COIN_FAILED, ADD_COIN_START, ADD_COIN_SUCCESS,
    DELETE_USER,
    DELETE_USER_FAILED,
    DELETE_USER_START, DELETE_USER_SUCCESS,
    FETCH_USERS,
    FETCH_USERS_FAILED,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS, CHANGE_ROLE, CHANGE_ROLE_FAILED, CHANGE_ROLE_START, CHANGE_ROLE_SUCCESS
} from "./Users.types";

export const fetchUsers = () => {
    return {
        type: FETCH_USERS
    }
};

export const fetchUsersStart = () => {
    return {
        type: FETCH_USERS_START
    }
};

export const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        users: users
    }
};

export const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        error: error
    }
};

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        id: id
    }
};

export const deleteUserStart = () => {
    return {
        type: DELETE_USER_START
    }
};

export const deleteUserSuccess = (user) => {
    return {
        type: DELETE_USER_SUCCESS,
        user: user
    }
};

export const deleteUserFailed = (error) => {
    return {
        type: DELETE_USER_FAILED,
        error: error
    }
};

export const addCoin = (id) => {
    return {
        type: ADD_COIN,
        id: id
    }
};

export const addCoinStart = () => {
    return {
        type: ADD_COIN_START
    }
};

export const addCoinSuccess = (id) => {
    return {
        type: ADD_COIN_SUCCESS,
        id: id
    }
};

export const addCoinFailed = (error) => {
    return {
        type: ADD_COIN_FAILED,
        error: error
    }
};

export const changeRole = (user) => {
    return {
        type: CHANGE_ROLE,
        user: user
    }
};

export const changeRoleStart = () => {
    return {
        type: CHANGE_ROLE_START,
    }
};

export const changeRoleSuccess = (id) => {
    return {
        type: CHANGE_ROLE_SUCCESS,
        id: id
    }
};

export const changeRoleFailed = (error) => {
    return {
        type: CHANGE_ROLE_FAILED,
        error: error
    }
};