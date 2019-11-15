import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';
import './EventsCalendar.styles.scss';
import Calendar from 'react-calendar';
import moment from "moment";

export const EventsCalendar = ({events, month}) => {
    const history = useHistory();

    const dates = events.map((event) => {return new Date(event.attributes.starts_at.substring(0, 10)).getTime()});

    useEffect(() => {
        console.log(dates)}, []);

    return (
        <>
            <h3 className={'subtitle'}>{moment(month).format('MMMM').toUpperCase()}</h3>
            <Calendar
                tileClassName={({date, view}) => {
                    date.setDate(date.getDate() + 1);
                    return (view === 'month' &&
                        dates.includes(new Date(date.toISOString().substring(0, 10)).getTime())) ? 'active-event' : null
                }}
                onClickDay={(value) => {
                    if (dates.includes(new Date(value.toISOString().substring(0, 10)).getTime())) {
                        let event = events.filter((event) =>
                            (new Date(event.attributes
                                .starts_at
                                .substring(0, 10))
                                .getTime() === new Date(value.toISOString().substring(0, 10)).getTime()))[0];
                        history.push(`/events/${event.id}`);
                    } else {
                        console.log(new Date(value.toISOString().substring(0, 10)))
                    }
                }}
                showNavigation={false}
                activeStartDate={month}
                showNeighboringMonth={false}
            />
        </>
    );
};