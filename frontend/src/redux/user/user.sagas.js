import {put, call, takeLatest} from 'redux-saga/effects'
import {axiosSecured} from "../../index";
import axios from 'axios';
import {AUTH_USER, LOGOUT_START, MAKE_RESERVATION} from "./user.types";
import {authFail, authSuccess, logoutSuccess, reservationFail, reservationSuccess} from "./user.actions";
import {push, goBack} from 'connected-react-router';

export function* watchAuthSaga() {
    yield takeLatest(AUTH_USER, authUser);
    yield takeLatest(LOGOUT_START, logout);
}

export function* watchReservationsSaga() {
    yield takeLatest(MAKE_RESERVATION, makeReservation);
}

function* authUser(action) {
    const url = action.mode === 'SIGN_IN' ? '/signin' : '/signup';
    try {
        const response = yield call(() => axios.request({
            url,
            params: {email: action.email, password: action.password},
            method: "POST"
        }));
        yield put(authSuccess(response.data.id, response.data.role, response.data.access, response.data.csrf));
        yield put(push('/'));
    } catch (error) {
        yield put(authFail(error));
        yield put(push('/'));
    }
}

function* logout() {
    yield put(push('/'));
    yield put(logoutSuccess());
}

function* makeReservation(action) {
    try {
        yield call(() => axiosSecured.request({
            url: '/api/v1/tickets',
            params: {tickets: action.tickets},
            method: "POST"
        }));
        const message = "Pomyślnie zarezerwowano miejsca. Bilety wkrótce zostaną przesłane na email powiązany z kontem";
        yield put(reservationSuccess(message))
    } catch (error) {
        yield put(goBack());
        yield(put(reservationFail(error.response.data.error)))
    }
}