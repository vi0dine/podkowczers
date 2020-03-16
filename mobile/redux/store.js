import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from "react-native";
import rootReducer from "./rootReducer";
import {watchUserSaga} from "./Users/Users.sagas";
import {watchEventsSaga} from "./Events/Events.sagas";
import {watchConcertsSaga} from "./Concerts/Concerts.sagas";
import {watchPostsSaga} from "./Posts/Posts.sagas";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

sagaMiddleware.run(watchUserSaga);
sagaMiddleware.run(watchEventsSaga);
sagaMiddleware.run(watchConcertsSaga);
sagaMiddleware.run(watchPostsSaga);