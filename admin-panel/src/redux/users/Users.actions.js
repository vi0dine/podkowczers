import {FETCH_USERS, FETCH_USERS_FAILED, FETCH_USERS_START, FETCH_USERS_SUCCESS} from "./Users.types";

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