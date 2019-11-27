import React, {useEffect} from 'react';
import './EventsTable.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router'
import {fetchEvents} from "../../redux/events/Events.actions";
import moment from "moment";

export const EventsTable = () => {
    const loading = useSelector(state => state.EventsState.loading);
    const events = useSelector(state => state.EventsState.events);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents())
    }, []);

    const columns = (
        <thead>
            <tr>
                <th>ID</th>
                <th>Koncert</th>
                <th>Miejsce</th>
                <th>Rozpoczęcie</th>
                <th>Czas trwania</th>
                <th>Bilety</th>
                <th>Utworzony</th>
                <th>Akcje</th>
            </tr>
        </thead>
    );

    const actions = (id) => (
        <>
            <button
                onClick={() => {dispatch(push(`/events/${id}`))}}
                className={'button is-primary is-small'}>EDYTUJ</button>&nbsp;
            <button
                onClick={() => {}}
                className={'button is-danger is-small'}>USUŃ</button>
        </>
    );

    return !loading && events && (
        <div className={'table-container'}>
            <table className={'table is-hoverable is-fullwidth'}>
                {columns}
                <tbody>
                {
                    events.map((event) =>
                        <tr>
                            <th>{event.id}</th>
                            <td>{event.attributes.concert}</td>
                            <td>{event.attributes.place}</td>
                            <td>{moment(event.attributes.starts_at).format('LLL')}</td>
                            <td>{Math.round(event.attributes.estimated_length/3600)} h</td>
                            <td>{event.attributes.tickets_count}</td>
                            <td>{moment(event.attributes.created_at).format('LLL')}</td>
                            <td>{actions(event.id)}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};