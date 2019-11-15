import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './EventsPage.styles.scss';
import {EventsList} from "../../components/events-list/EventsList.component";
import {EventsCalendar} from "../../components/events-calendar/EventsCalendar.component";
import moment from "moment";

export const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [ready, setReady] = useState(false);

    const fetchEvents = async () => {
        let response = await axios.request({url: '/api/v1/events', method: "GET"})
        setEvents(response.data.data);
        setReady(true);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return ready && (
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
                                <EventsCalendar events={events} month={new Date(moment())} />
                            </div>
                        </div>
                        <div className={'columns is-centered'}>
                            <div className={'column'}>
                                <EventsCalendar events={events} month={new Date(moment().add(1, 'month'))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};