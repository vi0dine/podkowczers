import {call, put, takeLatest} from 'redux-saga/effects'
import {DELETE_USER, FETCH_USERS} from "./Users.types";
import {axiosSecured} from "../../index";
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    fetchUsersFailed,
    fetchUsersStart,
    fetchUsersSuccess
} from "./Users.actions";

export function* watchUsersSaga() {
    yield takeLatest(FETCH_USERS, fetchUsers);
    yield takeLatest(DELETE_USER, deleteUser)
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

function* deleteUser(action) {
    try {
        yield put(deleteUserStart());
        const response = yield call(() => axiosSecured.request({
            url: `/api/v1/users/${action.id}`,
            method: "DELETE"
        }));
        console.log(response);
        yield put(deleteUserSuccess(response.data.data))
    } catch (error) {
        yield put(deleteUserFailed(error.response.data.error))
    }
}