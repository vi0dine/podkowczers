import {call, put, takeLatest} from 'redux-saga/effects'
import {FETCH_USERS} from "./Users.types";
import {axiosSecured} from "../../index";
import {fetchUsersFailed, fetchUsersStart, fetchUsersSuccess} from "./Users.actions";

export function* watchUsersSaga() {
    yield takeLatest(FETCH_USERS, fetchUsers);
}

function* fetchUsers() {
    try {
        yield put(fetchUsersStart());
        const response = yield call(() => axiosSecured.request({
            url: '/api/v1/users',
            method: "GET"
        }));
        yield put(fetchUsersSuccess(response.data.data));
    } catch (error) {
        yield put(fetchUsersFailed(error.response.data.error));
    }
}