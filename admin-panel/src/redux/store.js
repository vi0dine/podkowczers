import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import history from "../history";

import {createRootReducer} from "./rootReducer";
import {watchAuthSaga} from "./admin/Admin.sagas";
import {watchUsersSaga} from "./users/Users.sagas";
import {watchReviewsSaga} from "./reviews/Reviews.sagas";
import {watchCommentsSaga} from "./comments/Comments.sagas";
import {watchTicketsSaga} from "./tickets/Tickets.sagas";

const persistConfig = {
    key: 'root',
    storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history), logger];

export const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(...middlewares)));
export const persistor = persistStore(store);

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchUsersSaga);
sagaMiddleware.run(watchReviewsSaga);
sagaMiddleware.run(watchCommentsSaga);
sagaMiddleware.run(watchTicketsSaga);