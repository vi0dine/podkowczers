import React from 'react';
import './EventsPage.styles.scss';
import {EventsList} from "../../components/events-list/EventsList.component";

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
                    <div className={'column is-4'} style={{'background-color': 'red'}}>
                        <div className={'columns'}>
                            <div className={'events_addons column'}>
                                <div style={{'background-color': 'coral', 'height':'50%'}}>
                                    KALENDARZ
                                </div>
                                <div style={{'background-color': 'blue', 'height':'50%'}}>
                                    COŚ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};