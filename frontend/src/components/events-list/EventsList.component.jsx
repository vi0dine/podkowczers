import React from 'react';
import { useHistory } from 'react-router-dom';
import {EventsListItem} from "../event-list-item/EventsListItem.component";
import './EventsList.styles.scss'

export const EventsList = ({events}) => {
    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/events/${id}`);
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