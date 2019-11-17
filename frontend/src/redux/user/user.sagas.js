import {put, call, takeLatest, delay} from 'redux-saga/effects'
import {axiosSecured} from "../../index";
import axios from 'axios';
import {AUTH_USER, FETCH_USER, LOGOUT_START, MAKE_RESERVATION} from "./user.types";
import {
    authFail,
    authSuccess,
    clearNotification,
    getUser,
    fillProfile,
    logoutSuccess,
    reservationFail,
    reservationSuccess
} from "./user.actions";
import {push} from 'connected-react-router';

export function* watchAuthSaga() {
    yield takeLatest(AUTH_USER, authUser);
    yield takeLatest(LOGOUT_START, logout);
}

export function* watchReservationsSaga() {
    yield takeLatest(MAKE_RESERVATION, makeReservation);
    yield takeLatest(FETCH_USER, fetchUser)
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
        yield put(fillProfile(response.data.email, response.data.avatar, response.data.coins, response.data.reservations));
        yield put(push(`/user/${response.data.id}`));
    } catch (error) {
        yield put(authFail(error.response.data.error));
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
        yield put(reservationSuccess(message));
        yield put(getUser(action.id));
        yield put(push(`/user/${action.id}`));
        yield delay(2500);
        yield put(clearNotification());
    } catch (error) {
        yield put(reservationFail(error.response.data.error));
        yield delay(2500);
        yield put(clearNotification());
    }
}

function* fetchUser(action) {
    try {
        const response = yield call(() => axiosSecured.request({
            url: `/api/v1/users/${action.id}`,
            method: "GET"
        }));
        yield put(fillProfile(response.data.user.email, response.data.user.avatar, response.data.user.coins, response.data.user.reservations))
    } catch (error) {
        yield put(reservationFail(error.response.data.error));
        yield delay(2500);
        yield put(clearNotification());
    }
}