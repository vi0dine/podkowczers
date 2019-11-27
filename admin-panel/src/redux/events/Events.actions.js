import {FETCH_EVENTS, FETCH_EVENTS_FAILED, FETCH_EVENTS_START, FETCH_EVENTS_SUCCESS} from "./Events.types";

export const fetchEvents = () => {
    return {
        type: FETCH_EVENTS
    }
};

export const fetchEventsStart = () => {
    return {
        type: FETCH_EVENTS_START
    }
};

export const fetchEventsSuccess = (events) => {
    return {
        type: FETCH_EVENTS_SUCCESS,
        events: events
    }
};

export const fetchEventsFailed = (error) => {
    return {
        type: FETCH_EVENTS_FAILED,
        error: error
    }
};
