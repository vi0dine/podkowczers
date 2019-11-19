import {
    DELETE_USER,
    DELETE_USER_FAILED,
    DELETE_USER_START, DELETE_USER_SUCCESS,
    FETCH_USERS,
    FETCH_USERS_FAILED,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
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