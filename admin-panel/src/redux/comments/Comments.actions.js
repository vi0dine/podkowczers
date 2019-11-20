import {DELETE_COMMENT, DELETE_COMMENT_FAILED, DELETE_COMMENT_START, DELETE_COMMENT_SUCCESS} from "./Comments.types";

export const deleteComment = (comment_id) => {
    return {
        type: DELETE_COMMENT,
        id: comment_id
    }
};

export const deleteCommentStart = () => {
    return {
        type: DELETE_COMMENT_START
    }
};

export const deleteCommentSuccess = (comment) => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        comment: comment
    }
};

export const deleteCommentFailed = (error) => {
    return {
        type: DELETE_COMMENT_FAILED,
        error: error
    }
};