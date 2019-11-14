import React from 'react';
import './EventsPage.styles.scss';
import {EventsList} from "../../components/events-list/EventsList.component";
import {EventsCalendar} from "../../components/events-calendar/EventsCalendar.component";

export const EventsPage = () => {
    const events = [
        {
            id: 1,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 2,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 3,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 4,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 5,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 6,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 7,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        },
        {
            id: 8,
            name: 'Some event',
            dateTime: '09.08.2020 18:30',
            availableTickets: '30',
            reservationOpen: false
        }
    ];

    const sampleEvents = [
        {
            id: 1,
            start: new Date(2019, 10, 12),
            end: '2019-11-24'
        },
        {
            id: 2,
            start: new Date(2019, 10, 2),
            end: '2019-11-28'
        },
        {
            id: 3,
            start: new Date(2019, 10, 5),
            end: '2019-11-28'
        }
    ];

    return (
        <div className={'Events container is-fluid'}>
            <div className={'container'}>
                <div className={'columns'}>
                    <div className={'column is-4'}>
                        <h2 className={'title'}>Wydarzenia</h2>
                    </div>
                    <div className={'column is-offset-6 has-text-centered'}>
                        <h2 className={'title is-size-5'}>Dostępne</h2>
                        <p className={'subtitle'}>3</p>
                    </div>
                </div>
                <div className={'columns'}>
                    <div className={'events_list column is-8'}>
                        <EventsList events={events} />
                    </div>
                    <div className={'column is-4'}>
                        <div className={'columns is-centered'}>
                            <div className={'column'}>
                                <EventsCalendar events={sampleEvents} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};