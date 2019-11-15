import {put, call, takeLatest} from 'redux-saga/effects'
import axios from 'axios';
import {AUTH_USER, LOGOUT_START} from "./user.types";
import {authFail, authStart, authSuccess, logoutSuccess} from "./user.actions";
import history from "../../history";

export default function* watchAuthSaga() {
    yield takeLatest(AUTH_USER, authUser);
    yield takeLatest(LOGOUT_START, logout);
}

function* authUser(action) {
    yield put(authStart());
    const url = action.mode === 'SIGN_IN' ? '/signin' : '/signup';
    try {
        const response = yield call(() => axios.request({
            url,
            params: {email: action.email, password: action.password},
            method: "POST"
        }));
        yield put(authSuccess(response.data.id, response.data.role, response.data.csrf));
        history.push('/');
    } catch (error) {
        yield put(authFail(error))
    }
}

function* logout() {
    yield put(logoutSuccess());
    history.push('/');
}