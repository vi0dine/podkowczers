import {DELETE_TICKET, DELETE_TICKET_FAILED, DELETE_TICKET_START, DELETE_TICKET_SUCCESS} from "./Tickets.types";

export const deleteTicket = (ticket_id) => {
    return {
        type: DELETE_TICKET,
        id: ticket_id
    }
};

export const deleteTicketStart = () => {
    return {
        type: DELETE_TICKET_START
    }
};

export const deleteTicketSuccess = (ticket) => {
    return {
        type: DELETE_TICKET_SUCCESS,
        ticket: ticket
    }
};

export const deleteTicketFailed = (error) => {
    return {
        type: DELETE_TICKET_FAILED,
        error: error
    }
};