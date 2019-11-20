import {DELETE_REVIEW_FAILED, DELETE_REVIEW_START, DELETE_REVIEW_SUCCESS} from "./Reviews.types";

const INITIAL_STATE = {
    reviews: null,
    error: null,
    loading: false
};

export const reviewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_REVIEW_START:
            return {
                ...state,
                loading: true
            };
        // case DELETE_REVIEW_SUCCESS:
        //     return {
        //         ...state,
        //         reviews: state.reviews.filter((review) => review.id !== action.review.id),
        //         loading: false
        //     };
        case DELETE_REVIEW_FAILED:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
};