import {
    BOOK_TICKETS, BOOK_TICKETS_FAIL, BOOK_TICKETS_SUCCESS,
    FETCH_EVENT,
    FETCH_EVENT_FAIL,
    FETCH_EVENT_SUCCESS,
    FETCH_EVENTS,
    FETCH_EVENTS_FAIL,
    FETCH_EVENTS_SUCCESS
} from "./Events.types";

export const fetchEvents = () => {
    return {
        type: FETCH_EVENTS
    }
};

export const fetchEventsSuccess = (events) => {
    return {
        type: FETCH_EVENTS_SUCCESS,
        events: events
    }
};

export const fetchEventsFail = (error) => {
    return {
        type: FETCH_EVENTS_FAIL,
        error: error
    }
};

export const fetchEvent = (id) => {
    return {
        type: FETCH_EVENT,
        id: id
    }
};

export const fetchEventSuccess = (event) => {
    return {
        type: FETCH_EVENT_SUCCESS,
        event: event
    }
};

export const fetchEventFail = (error) => {
    return {
        type: FETCH_EVENT_FAIL,
        error: error
    }
};

export const bookTickets = (id, tickets) => {
    return {
        type: BOOK_TICKETS,
        event_id: id,
        tickets: tickets
    }
};

export const bookTicketsSuccess = (id, tickets) => {
    return {
        type: BOOK_TICKETS_SUCCESS,
        event_id: id,
        tickets: tickets
    }
};

export const bookTicketsFail = (error) => {
    return {
        type: BOOK_TICKETS_FAIL,
        error: error
    }
};