import {takeLatest, put, call} from 'redux-saga/effects'
import axios from 'axios';
import {FETCH_POSTS} from "./Posts.types";
import {fetchPostsFail, fetchPostsSuccess} from "./Posts.actions";

export function* watchPostsSaga() {
    yield takeLatest(FETCH_POSTS, getPosts);
}

function* getPosts() {
    try {
        const { data } = yield call(() => axios.request({
            url: '/api/v1/posts',
            method: "GET"
        }));
        console.log(data.posts);
        yield put(fetchPostsSuccess(data.posts))
    } catch (error) {
        yield put(fetchPostsFail(error))
    }
}