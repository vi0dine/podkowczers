import { combineReducers } from "redux";
import {userReducer} from "./Users/Users.reducer";
import {eventsReducer} from "./Events/Events.reducer";
import {notificationsReducer} from "./notificationsReducer";
import {concertsReducer} from "./Concerts/Concerts.reducer";

const rootReducer = combineReducers({
    UserState: userReducer,
    EventsState: eventsReducer,
    ConcertsState: concertsReducer,
    notifications: notificationsReducer
});

export default rootReducer