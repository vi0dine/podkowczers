import {FETCH_POSTS, FETCH_POSTS_FAIL, FETCH_POSTS_SUCCESS} from "../Posts/Posts.types";

export const fetchPosts = () => {
    return {
        type: FETCH_POSTS
    }
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts: posts
    }
};

export const fetchPostsFail = (error) => {
    return {
        type: FETCH_POSTS_FAIL,
        error: error
    }
};