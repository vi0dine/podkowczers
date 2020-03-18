import {takeLatest, put, call, delay} from 'redux-saga/effects';
import axios from 'axios';
import {AUTH_USER, FETCH_USER, LOGOUT_USER, REGISTER_USER} from "./Users.types";
import {
    authUser,
    authUserFail,
    authUserSuccess,
    fetchUserFail,
    fetchUserSuccess, logoutUserFail, logoutUserSuccess, registerUserFail,
    registerUserSuccess
} from "./Users.actions";

export function* watchUserSaga() {
    yield takeLatest(REGISTER_USER, signUpUser);
    yield takeLatest(AUTH_USER, authenticateUser);
    yield takeLatest(FETCH_USER, getUserData);
    yield takeLatest(LOGOUT_USER, logoutUser);
}

function* signUpUser(action) {
    try {
        yield call(() => axios.request({
            url: '/api/v1/users',
            data: {
                user: {
                    email: action.email,
                    password: action.password,
                }
            },
            method: 'POST'
        }));
        yield put(registerUserSuccess());
        yield delay(2000);
        yield put(authUser(action.email, action.password, action.navigation))
    } catch (error) {
        yield put(registerUserFail(error))
    }
}

function* authenticateUser(action) {
    try {
        const {data} = yield call(() => axios.request({
            url: '/oauth/token',
            data: {
                email: action.email,
                password: action.password,
                grant_type: "password",
                client_id: "mq-j3Hs0HYCO6NvyN3BGRlo2AT4UHuKmOE-Z5UtKr4w",
                client_secret: "0XxJyJXq0dSGs7uyfZPAEXAxVoajI8k5QYwhQcNLHb0"
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
        const {data} = yield call(() => axios.request({
            url: `/api/v1/users/${action.id}`,
            method: 'GET'
        }));
        yield put(fetchUserSuccess(data.user));
    } catch (error) {
        yield put(fetchUserFail(error))
    }
}

function* logoutUser(action) {
    try {
        yield call(() => axios.request({
            url: `/sign_out`,
            method: 'DELETE'
        }));
        yield call(() => axios.request({
            url: `/oauth/revoke`,
            data: {
                client_id: "T1vkA5VM7zQkI3P44fA-zaZEPQlIgUZITYSk6EwUdbA",
                client_secret: "ypzhNGtiJSMw90aGeyuZuwGpdXwT_twFw7GNXnk2hX0",
                token: store.getState().UserState.access_token
            },
            method: 'POST'
        }));
        yield put(logoutUserSuccess());
        yield call(() => action.navigation.navigate('Login'))
    } catch (error) {
        yield put(logoutUserFail(error))
    }
}