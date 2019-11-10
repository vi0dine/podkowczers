import React from 'react';
import {EventsListItem} from "../event-list-item/EventsListItem.component";

export const EventsList = () => {
    const events = [
        {
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        }
    ];

    return (
        <div className={'EventsList'}>
            {events.map((event) => (
                <EventsListItem event={event} />
            ))}
        </div>
    );
};