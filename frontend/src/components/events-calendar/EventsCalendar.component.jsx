import React from "react";
import { useHistory } from 'react-router-dom';
import './EventsCalendar.styles.scss';
import Calendar from 'react-calendar';
import moment from "moment";

export const EventsCalendar = ({events}) => {
    const history = useHistory();

    const dates = events.map((event) => {return event.start.getTime()});

    return (
        <>
            <h3 className={'subtitle'}>{moment().format('MMMM').toUpperCase()}</h3>
            <Calendar
                tileClassName={({date, view}) => {
                    return (view === 'month' && dates.includes(date.getTime())) ? 'active-event' : null
                }}
                onClickDay={(value) => {
                    if (dates.includes(value.getTime())) {
                        let event = events.filter((event) => (new Date(event.start).getTime() === value.getTime()))[0];
                        console.log(event);
                        history.push(`/events/${event.id}`);
                    }
                }}
                showNavigation={false}
            />
        </>
    );
};