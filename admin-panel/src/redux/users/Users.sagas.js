import {call, put, takeLatest} from 'redux-saga/effects'
import {ADD_COIN, DELETE_USER, FETCH_USERS, CHANGE_ROLE} from "./Users.types";
import {axiosSecured} from "../../index";
import {
    addCoinFailed,
    addCoinStart, addCoinSuccess,
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    fetchUsersFailed,
    fetchUsersStart,
    fetchUsersSuccess, changeRoleFailed, changeRoleStart, changeRoleSuccess
} from "./Users.actions";

export function* watchUsersSaga() {
    yield takeLatest(FETCH_USERS, fetchUsers);
    yield takeLatest(DELETE_USER, deleteUser);
    yield takeLatest(ADD_COIN, addCoin);
    yield takeLatest(CHANGE_ROLE, changeRole)
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
        yield put(deleteUserSuccess(response.data.data))
    } catch (error) {
        yield put(deleteUserFailed(error.response.data.error))
    }
}

function* addCoin(action) {
    try {
        yield put(addCoinStart());
        yield call(() => axiosSecured.request({
            url: `/api/v1/users/${action.id}/coin`,
            method: "POST"
        }));
        yield put(addCoinSuccess(action.id))
    } catch (error) {
        yield put(addCoinFailed(error))
    }
}

function* changeRole(action) {
    try {
        let uri = action.user.attributes.role === 'user' ? `/api/v1/users/${action.user.id}/promote` : `/api/v1/users/${action.user.id}/demote`;
        yield put(changeRoleStart());
        yield call(() => axiosSecured.request({
            url: uri,
            method: "POST"
        }));
        yield put(changeRoleSuccess(action.user.id));
    } catch (error) {
        yield put(changeRoleFailed());
    }
}