import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import history from "../history";

import {createRootReducer} from "./rootReducer";
import {watchAuthSaga} from "./user/User.sagas";
import {watchUsersSaga} from "./users/Users.sagas";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history), logger];

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchUsersSaga);