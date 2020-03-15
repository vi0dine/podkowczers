import {
    BOOK_TICKETS,
    BOOK_TICKETS_FAIL,
    BOOK_TICKETS_SUCCESS,
    FETCH_EVENT_SUCCESS,
    FETCH_EVENTS_SUCCESS
} from "./Events.types";

const INITIAL_STATE = {
    events: [],
    processing: false
};

const updateEventTickets = (state, action) => {
    let tickets_ids = action.tickets.map(ticket => ticket.id);
    console.log(tickets_ids);
    let updated = state.events.find(event => event.id === action.event_id);
    console.log(updated);
    let rest = state.events.filter(event => event.id !== action.event_id);

    updated.tickets = updated.tickets.filter(ticket => !tickets_ids.includes(ticket.id)).concat(action.tickets);
    console.log(updated.tickets.filter(ticket => ticket.reserved));

    return [...rest, updated]
};

export const eventsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events
            };
        case FETCH_EVENT_SUCCESS:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.event.id).concat(action.event)
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