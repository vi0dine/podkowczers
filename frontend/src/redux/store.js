import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import history from "../history";

import {createRootReducer} from "./root-reducer";
import {watchAuthSaga, watchReservationsSaga} from "./user/user.sagas";

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
sagaMiddleware.run(watchReservationsSaga);