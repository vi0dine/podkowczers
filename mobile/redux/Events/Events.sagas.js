import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {BOOK_TICKETS, FETCH_EVENT, FETCH_EVENTS} from "./Events.types";
import {
    bookTicketsFail,
    bookTicketsSuccess, fetchEvent,
    fetchEventFail,
    fetchEventsFail,
    fetchEventsSuccess,
    fetchEventSuccess
} from "./Events.actions";
import {fetchUser} from "../Users/Users.actions";

export function* watchEventsSaga() {
    yield takeLatest(FETCH_EVENTS, getEvents);
    yield takeLatest(FETCH_EVENT, getEvent);
    yield takeLatest(BOOK_TICKETS, makeReservation);
}

function* getEvents() {
    try {
        const { data } = yield call(() => axios.request({
            url: '/api/v1/events',
            method: "GET"
        }));
        yield put(fetchEventsSuccess(data.events))
    } catch (error) {
        yield put(fetchEventsFail(error))
    }
}

function* getEvent(action) {
    try {
        const { data } = yield call(() => axios.request({
            url: `/api/v1/events/${action.id}`,
            method: "GET"
        }));
        yield put(fetchEventSuccess(data.event))
    } catch (error) {
        yield put(fetchEventFail(error))
    }
}

function* makeReservation(action) {
    try {
        const { data } = yield call(() => axios.request({
            url: `/api/v1/tickets`,
            data: {
                tickets: action.tickets
            },
            method: "POST"
        }));
        yield put(bookTicketsSuccess(action.event_id, data.tickets))
    } catch (error) {
        yield put(bookTicketsFail(error))
    }
}