import {takeLatest, call, put} from 'redux-saga/effects'
import { axiosSecured } from "../../index";
import {DELETE_TICKET} from "./Tickets.types";
import {deleteTicketFailed, deleteTicketStart, deleteTicketSuccess} from "./Tickets.actions";

export function* watchTicketsSaga() {
    yield takeLatest(DELETE_TICKET, deleteTicket)
}

function* deleteTicket(action) {
    try {
        yield put(deleteTicketStart());
        const response = yield call(() => axiosSecured.request({
            url: `/api/v1/tickets/${action.id}`,
            method: "DELETE"
        }));
        yield put(deleteTicketSuccess(response.data.data))
    } catch (error) {
        yield put(deleteTicketFailed(error.response.data.error))
    }
}