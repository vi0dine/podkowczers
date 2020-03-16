import {FETCH_POSTS_SUCCESS} from "./Posts.types";

const INITIAL_STATE = {
    posts: []
};

export const postsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts
            };
        default:
            return state
    }
};