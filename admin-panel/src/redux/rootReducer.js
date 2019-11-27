import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import adminReducer from "./admin/Admin.reducer";
import usersReducer from "./users/Users.reducer";
import {reviewsReducer} from "./reviews/Reviews.reducer";
import {commentsReducer} from "./comments/Comments.reducer";
import {ticketsReducer} from "./tickets/Tickets.reducer";
import {eventsReducer} from "./events/Events.reducer";

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    UserState: adminReducer,
    UsersState: usersReducer,
    ReviewsState: reviewsReducer,
    CommentsState: commentsReducer,
    TicketsState: ticketsReducer,
    EventsState: eventsReducer
});