import {FETCH_CONCERT_SUCCESS, FETCH_CONCERTS_SUCCESS} from "./Concerts.types";
import {FETCH_EVENT_SUCCESS} from "../Events/Events.types";

const INITIAL_STATE = {
    concerts: []
};

export const concertsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CONCERTS_SUCCESS:
            return {
                ...state,
                concerts: action.concerts
            };
        case FETCH_CONCERT_SUCCESS:
            return {
                ...state,
                concerts: state.concerts.filter(concert => concert.id !== action.concert.id).concat(action.concert)
            };
        default:
            return state
    }
};