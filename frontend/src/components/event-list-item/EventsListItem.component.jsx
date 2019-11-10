import React from 'react';
import './EventsListItem.styles.scss';

export const EventsListItem = ({event}) => {
    return (
        <div className={'EventsListItem columns is-vcentered'}>
            <div className={'column is-1 has-text-centered'}>
                        <span className={'icon is-large'}>
                            <i className={'fas fa-2x fa-info-circle'}/>
                        </span>
            </div>
            <div className={'column is-8 has-text-centered'}>
                <div className={'columns is-vcentered'}>
                    <div className={'column'}>
                        {event.name}
                    </div>
                    <div className={'column'}>
                        {event.dateTime}
                    </div>
                </div>
            </div>
            <div className={'column has-text-centered'}>
                {event.availableTickets}
            </div>
        </div>
    );
};