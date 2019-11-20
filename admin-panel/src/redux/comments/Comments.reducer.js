import {DELETE_COMMENT_FAILED, DELETE_COMMENT_START} from "./Comments.types";

const INITIAL_STATE = {
    comments: null,
    error: null,
    loading: false
};

export const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_COMMENT_START:
            return {
                ...state,
                loading: true
            };
        // case DELETE_COMMENT_SUCCESS:
        //     return {
        //         ...state,
        //         comments: state.comments.filter((comment) => comment.id !== action.comment.id),
        //         loading: false
        //     };
        case DELETE_COMMENT_FAILED:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
};