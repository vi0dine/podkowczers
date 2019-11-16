import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import userReducer from "./user/user.reducer";
import appReducer from "./app/app.reducer";

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    AppState: appReducer,
    UserState: userReducer
});