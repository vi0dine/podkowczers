import {
    BOOK_TICKETS, BOOK_TICKETS_FAIL, BOOK_TICKETS_SUCCESS,
    FETCH_EVENT,
    FETCH_EVENT_FAIL,
    FETCH_EVENT_SUCCESS,
    FETCH_EVENTS,
    FETCH_EVENTS_FAIL,
    FETCH_EVENTS_SUCCESS, RETURN_TICKET, RETURN_TICKET_FAIL, RETURN_TICKET_SUCCESS
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

export const returnTicket = (id) => {
    return {
        type: RETURN_TICKET,
        id: id
    }
};

export const returnTicketSuccess = (event_id, ticket_id) => {
    return {
        type: RETURN_TICKET_SUCCESS,
        event_id: event_id,
        ticket_id: ticket_id
    }
};

export const returnTicketFail = (error) => {
    return {
        type: RETURN_TICKET_FAIL,
        error: error
    }
};