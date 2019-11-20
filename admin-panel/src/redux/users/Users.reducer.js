import {
    ADD_COIN_FAILED,
    ADD_COIN_START,
    ADD_COIN_SUCCESS,
    DELETE_USER_FAILED,
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    FETCH_USERS_FAILED,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS, CHANGE_ROLE_FAILED, CHANGE_ROLE_START, CHANGE_ROLE_SUCCESS
} from "./Users.types";
import {DELETE_REVIEW_SUCCESS} from "../reviews/Reviews.types";
import {DELETE_COMMENT_SUCCESS} from "../comments/Comments.types";
import {DELETE_TICKET_SUCCESS} from "../tickets/Tickets.types";

const INITIAL_STATE = {
    users: null,
    error: null,
    loading: false
};

const usersReducer = (state = INITIAL_STATE, action) => {
    let updatedUser = null;
    let otherUsers = null;
    let newUsers = null;

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
        case DELETE_REVIEW_SUCCESS:
            updatedUser = state.users.find((user) => user.id === action.review.relationships.user.data.id);
            updatedUser.attributes.reviews = updatedUser.attributes.reviews.filter((review) => (review.id != action.review.id));
            otherUsers = state.users.filter((user) => user.id !== action.review.relationships.user.data.id);
            newUsers = otherUsers.concat(updatedUser);
            return {
                ...state,
                users: newUsers
            };
        case DELETE_COMMENT_SUCCESS:
            updatedUser = state.users.find((user) => user.id === action.comment.relationships.user.data.id);
            updatedUser.attributes.comments = updatedUser.attributes.comments.filter((comment) => (comment.id != action.comment.id));
            otherUsers = state.users.filter((user) => user.id !== action.comment.relationships.user.data.id);
            newUsers = otherUsers.concat(updatedUser);
            return {
                ...state,
                users: newUsers
            };
        case DELETE_TICKET_SUCCESS:
            updatedUser = state.users.find((user) => user.id === action.ticket.relationships.user.data.id);
            updatedUser.attributes.tickets = updatedUser.attributes.tickets.filter((ticket) => (ticket.id != action.ticket.id));
            otherUsers = state.users.filter((user) => user.id !== action.ticket.relationships.user.data.id);
            newUsers = otherUsers.concat(updatedUser);
            return {
                ...state,
                users: newUsers
            };
        case ADD_COIN_START:
            return {
                ...state,
                loading: false
            };
        case ADD_COIN_SUCCESS:
            updatedUser = state.users.find((user) => user.id === action.id);
            updatedUser.attributes.coins_count += 1;
            otherUsers = state.users.filter((user) => user.id !== action.id);
            newUsers = otherUsers.concat(updatedUser);
            return {
                ...state,
                users: newUsers,
                loading: false
            };
        case ADD_COIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case CHANGE_ROLE_START:
            return {
                ...state,
                loading: false
            };
        case CHANGE_ROLE_SUCCESS:
            updatedUser = state.users.find((user) => user.id === action.id);
            updatedUser.attributes.role = updatedUser.attributes.role === 'admin' ? 'user' : 'admin';
            otherUsers = state.users.filter((user) => user.id !== action.id);
            newUsers = otherUsers.concat(updatedUser);
            return {
                ...state,
                users: newUsers,
                loading: false
            };
        case CHANGE_ROLE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default: return state;
    }
};

export default usersReducer;