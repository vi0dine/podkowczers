import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import appReducer from "./app/app.reducer";

export default combineReducers({
    AppState: appReducer,
    UserState: userReducer
});