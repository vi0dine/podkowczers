import {
    FETCH_CONCERT, FETCH_CONCERT_FAIL,
    FETCH_CONCERT_SUCCESS,
    FETCH_CONCERTS,
    FETCH_CONCERTS_FAIL,
    FETCH_CONCERTS_SUCCESS
} from "./Concerts.types";

const INITIAL_STATE = {
    concerts: [],
    fetching: false
};

export const concertsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CONCERTS:
            return {
                ...state,
                fetching: true
            };
        case FETCH_CONCERTS_SUCCESS:
            return {
                ...state,
                concerts: action.concerts,
                fetching: false
            };
        case FETCH_CONCERTS_FAIL:
            return {
                ...state,
                fetching: false
            };
        case FETCH_CONCERT:
            return {
                ...state,
                fetching: true
            };
        case FETCH_CONCERT_SUCCESS:
            return {
                ...state,
                concerts: state.concerts.filter(concert => concert.id !== action.concert.id).concat(action.concert),
                fetching: false
            };
        case FETCH_CONCERT_FAIL:
            return {
                ...state,
                fetching: false
            };
        default:
            return state
    }
};