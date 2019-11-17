import {put, call, takeLatest} from 'redux-saga/effects'
import axios from 'axios';
import {AUTH_USER, LOGOUT} from "./User.types";
import {
    authFail,
    authSuccess,
    logoutSuccess,
} from "./User.actions";
import {push} from 'connected-react-router';

export function* watchAuthSaga() {
    yield takeLatest(AUTH_USER, authUser);
    yield takeLatest(LOGOUT, logout);
}

function* authUser(action) {
    try {
        const response = yield call(() => axios.request({
            url: '/signin',
            params: {email: action.email, password: action.password},
            method: "POST"
        }));
        yield put(authSuccess(response.data.id, response.data.role, response.data.access, response.data.csrf));
        yield put(push(`/dashboard`));
    } catch (error) {
        yield put(authFail(error.response.data.error));
        yield put(push('/'));
    }
}

function* logout() {
    yield put(push('/'));
    yield put(logoutSuccess());
}