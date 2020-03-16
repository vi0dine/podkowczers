import {takeLatest, put, call} from 'redux-saga/effects'
import axios from 'axios';
import {FETCH_CONCERT, FETCH_CONCERTS} from "./Concerts.types";
import {fetchConcertFail, fetchConcertsFail, fetchConcertsSuccess, fetchConcertSuccess} from "./Concerts.actions";

export function* watchConcertsSaga() {
    yield takeLatest(FETCH_CONCERTS, getConcerts);
    yield takeLatest(FETCH_CONCERT, getConcert);
}

function* getConcerts() {
    try {
        const { data } = yield call(() => axios.request({
            url: '/api/v1/concerts',
            method: "GET"
        }));
        yield put(fetchConcertsSuccess(data.concerts))
    } catch (error) {
        yield put(fetchConcertsFail(error))
    }
}

function* getConcert(action) {
    try {
        const { data } = yield call(() => axios.request({
            url: `/api/v1/concerts/${action.id}`,
            method: "GET"
        }));
        yield put(fetchConcertSuccess(data.concert))
    } catch (error) {
        yield put(fetchConcertFail(error))
    }
}