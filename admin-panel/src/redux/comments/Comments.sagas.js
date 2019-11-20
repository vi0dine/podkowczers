import {takeLatest, call, put} from 'redux-saga/effects'
import { axiosSecured } from "../../index";
import {DELETE_COMMENT} from "./Comments.types";
import {deleteCommentFailed, deleteCommentStart, deleteCommentSuccess} from "./Comments.actions";

export function* watchCommentsSaga() {
    yield takeLatest(DELETE_COMMENT, deleteComment)
}

function* deleteComment(action) {
    try {
        yield put(deleteCommentStart());
        const response = yield call(() => axiosSecured.request({
            url: `/api/v1/comments/${action.id}`,
            method: "DELETE"
        }));
        yield put(deleteCommentSuccess(response.data.data))
    } catch (error) {
        yield put(deleteCommentFailed(error.response.data.error))
    }
}