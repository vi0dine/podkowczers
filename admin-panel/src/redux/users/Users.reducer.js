import {
    DELETE_USER_FAILED,
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    FETCH_USERS_FAILED,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from "./Users.types";

const INITIAL_STATE = {
    users: null,
    error: null,
    loading: false
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USERS_START:
            return {...state, loading: true};
        case FETCH_USERS_SUCCESS:
            return {...state, users: action.users, loading: false};
        case FETCH_USERS_FAILED:
            return {...state, error: action.error, loading: false};
        case DELETE_USER_START:
            return {...state, loading: true};
        case DELETE_USER_SUCCESS:
            return {...state, users: state.users.filter((user) => (user.id !== action.user.id)), loading: false };
        case DELETE_USER_FAILED:
            return {...state, loading: false };
        default: return state;
    }
};

export default usersReducer;