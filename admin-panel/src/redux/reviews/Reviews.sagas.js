import {takeLatest, call, put} from 'redux-saga/effects'
import { axiosSecured } from "../../index";
import {DELETE_REVIEW} from "./Reviews.types";
import {deleteReviewFailed, deleteReviewStart, deleteReviewSuccess} from "./Reviews.actions";

export function* watchReviewsSaga() {
    yield takeLatest(DELETE_REVIEW, deleteReview)
}

function* deleteReview(action) {
    try {
        yield put(deleteReviewStart());
        const response = yield call(() => axiosSecured.request({
            url: `/api/v1/reviews/${action.id}`,
            method: "DELETE"
        }));
        yield put(deleteReviewSuccess(response.data.data))
    } catch (error) {
        yield put(deleteReviewFailed(error.response.data.error))
    }
}