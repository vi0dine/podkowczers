import { takeLatest, put, call } from 'redux-saga/effects'
import { axiosSecured } from "../../index";
import {FETCH_EVENTS} from "./Events.types";
import {fetchEventsFailed, fetchEventsStart, fetchEventsSuccess} from "./Events.actions";

export function* watchEventsSaga() {
    yield takeLatest(FETCH_EVENTS, fetchEvents)
}

function* fetchEvents() {
    try {
        yield put(fetchEventsStart());
        const res = yield call(() => axiosSecured.request({
            url: '/api/v1/events',
            method: "GET"
        }));
        yield put(fetchEventsSuccess(res.data.data))
    } catch (error) {
        yield put(fetchEventsFailed(error))
    }
}