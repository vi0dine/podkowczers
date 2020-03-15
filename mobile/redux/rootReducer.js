import { combineReducers } from "redux";
import {userReducer} from "./Users/Users.reducer";
import {eventsReducer} from "./Events/Events.reducer";
import {notificationsReducer} from "./notificationsReducer";

const rootReducer = combineReducers({
    UserState: userReducer,
    EventsState: eventsReducer,
    notifications: notificationsReducer
});

export default rootReducer