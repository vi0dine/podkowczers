import { combineReducers } from "redux";
import {userReducer} from "./Users/Users.reducer";
import {eventsReducer} from "./Events/Events.reducer";
import {notificationsReducer} from "./notificationsReducer";
import {concertsReducer} from "./Concerts/Concerts.reducer";
import {postsReducer} from "./Posts/Posts.reducer";

const rootReducer = combineReducers({
    UserState: userReducer,
    EventsState: eventsReducer,
    ConcertsState: concertsReducer,
    PostsState: postsReducer,
    notifications: notificationsReducer
});

export default rootReducer