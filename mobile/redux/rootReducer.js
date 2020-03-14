import { combineReducers } from "redux";
import {userReducer} from "./Users/Users.reducer";

const rootReducer = combineReducers({
    UserState: userReducer
});

export default rootReducer