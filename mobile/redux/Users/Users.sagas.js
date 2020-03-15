import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {AUTH_USER, FETCH_USER} from "./Users.types";
import {authUserFail, authUserSuccess, fetchUserFail, fetchUserSuccess} from "./Users.actions";

export function* watchUserSaga() {
    yield takeLatest(AUTH_USER, authenticateUser);
    yield takeLatest(FETCH_USER, getUserData);
}

function* authenticateUser(action) {
    try {
        const { data } = yield call(() => axios.request({
            url: '/oauth/token',
            data: {
                email: action.email,
                password: action.password,
                grant_type: "password",
                client_id: "cqAgytDse_c7qpfFbcEGFIed8VnzKWOTEEbwDh8U--Q",
                client_secret: "flhRCe1u5XCrHU3vwh_aecSDl5sCwPUalLcNZgDhJL4"
            },
            method: 'POST'
        }));
        yield put(authUserSuccess(data));
        yield call(() => action.navigation.navigate('Main'))
    } catch (error) {
        yield put(authUserFail(error))
    }
}

function* getUserData(action) {
    try {
        const { data } = yield call(() => axios.request({
            url: `/api/v1/users/${action.id}`,
            method: 'GET'
        }));
        yield put(fetchUserSuccess(data.user));
    } catch (error) {
        yield put(fetchUserFail(error))
    }
}