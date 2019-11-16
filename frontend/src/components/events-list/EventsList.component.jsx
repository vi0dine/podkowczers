import React from 'react';
import {push} from 'connected-react-router';
import {EventsListItem} from "../event-list-item/EventsListItem.component";
import './EventsList.styles.scss'
import {useDispatch} from "react-redux";

export const EventsList = ({events}) => {
    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(push(`/events/${id}`));
    };

    return (
        <div className={'EventsList'}>
            {events.map((event) => (
                <EventsListItem
                    key={event.id}
                    event={event}
                    handleClick={handleClick}
                />
            ))}
        </div>
    );
};