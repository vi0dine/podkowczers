import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import userReducer from "./user/User.reducer";
import usersReducer from "./users/Users.reducer";

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    UserState: userReducer,
    UsersState: usersReducer
});