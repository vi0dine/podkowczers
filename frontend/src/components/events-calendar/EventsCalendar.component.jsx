import React, {useEffect} from "react";
import './EventsCalendar.styles.scss';
import Calendar from 'react-calendar';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router';

export const EventsCalendar = ({events, month}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserState.id);

    const dates = events.map((event) => {return new Date(event.attributes.starts_at.substring(0, 10)).getTime()});


    return (
        <>
            <h3 className={'subtitle'}>{moment(month).format('MMMM').toUpperCase()}</h3>
            <Calendar
                tileClassName={({date, view}) => {
                    date.setDate(date.getDate() + 1);
                    return (view === 'month' &&
                        dates.includes(new Date(date.toISOString().substring(0, 10)).getTime())) ? 'active-event' : null
                }}
                onClickDay={user ? (value) => {
                    value.setDate(value.getDate()+1);
                    if (dates.includes(new Date(value.toISOString().substring(0, 10)).getTime())) {
                        let event = events.filter((event) =>
                            (new Date(event.attributes
                                .starts_at
                                .substring(0, 10))
                                .getTime() === new Date(value.toISOString().substring(0, 10)).getTime()))[0];
                        dispatch(push(`/events/${event.id}`));
                    }
                } : () => {}}
                showNavigation={false}
                activeStartDate={month}
                showNeighboringMonth={false}
            />
        </>
    );
};