import {FETCH_EVENTS_FAILED, FETCH_EVENTS_START, FETCH_EVENTS_SUCCESS} from "./Events.types";

const INITIAL_STATE = {
    events: null,
    loading: null,
    error: null
};

export const eventsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_EVENTS_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events,
                loading: false
            };
        case FETCH_EVENTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
};