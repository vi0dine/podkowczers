import {DELETE_REVIEW, DELETE_REVIEW_FAILED, DELETE_REVIEW_START, DELETE_REVIEW_SUCCESS} from "./Reviews.types";

export const deleteReview = (review_id) => {
    return {
        type: DELETE_REVIEW,
        id: review_id
    }
};

export const deleteReviewStart = () => {
    return {
        type: DELETE_REVIEW_START
    }
};

export const deleteReviewSuccess = (review) => {
    return {
        type: DELETE_REVIEW_SUCCESS,
        review: review
    }
};

export const deleteReviewFailed = (error) => {
    return {
        type: DELETE_REVIEW_FAILED,
        error: error
    }
};