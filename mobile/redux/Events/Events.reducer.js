import {
    BOOK_TICKETS,
    BOOK_TICKETS_FAIL,
    BOOK_TICKETS_SUCCESS, FETCH_EVENT, FETCH_EVENT_FAIL,
    FETCH_EVENT_SUCCESS, FETCH_EVENTS, FETCH_EVENTS_FAIL,
    FETCH_EVENTS_SUCCESS
} from "./Events.types";

const INITIAL_STATE = {
    events: [],
    processing: false,
    fetching: false
};

const updateEventTickets = (state, action) => {
    let tickets_ids = action.tickets.map(ticket => ticket.id);
    let updated = state.events.find(event => event.id === action.event_id);
    let rest = state.events.filter(event => event.id !== action.event_id);

    updated.tickets = updated.tickets.filter(ticket => !tickets_ids.includes(ticket.id)).concat(action.tickets);

    return [...rest, updated]
};

export const eventsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                fetching: true
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events,
                fetching: false
            };
        case FETCH_EVENTS_FAIL:
            return {
                ...state,
                fetching: false
            };
        case FETCH_EVENT:
            return {
                ...state,
                fetching: true
            };
        case FETCH_EVENT_SUCCESS:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.event.id).concat(action.event),
                fetching: false
            };
        case FETCH_EVENT_FAIL:
            return {
                ...state,
                fetching: false
            };
        case BOOK_TICKETS:
            return {
                ...state,
                processing: true
            };
        case BOOK_TICKETS_SUCCESS:
            return {
                ...state,
                events: updateEventTickets(state, action),
                processing: false
            };
        case BOOK_TICKETS_FAIL:
            return {
                ...state,
                processing: false
            };
        default:
            return state
    }
};