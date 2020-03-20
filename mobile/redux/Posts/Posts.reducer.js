import {FETCH_POSTS, FETCH_POSTS_FAIL, FETCH_POSTS_SUCCESS} from "./Posts.types";

const INITIAL_STATE = {
    posts: [],
    fetching: false
};

export const postsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
              ...state,
              fetching: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts,
                fetching: false
            };
        case FETCH_POSTS_FAIL:
            return {
                ...state,
                fetching: false
            };
        default:
            return state
    }
};