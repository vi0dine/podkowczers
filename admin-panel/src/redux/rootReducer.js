import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import adminReducer from "./admin/Admin.reducer";
import usersReducer from "./users/Users.reducer";

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    UserState: adminReducer,
    UsersState: usersReducer
});