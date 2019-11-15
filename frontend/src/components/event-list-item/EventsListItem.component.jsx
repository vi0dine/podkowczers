import React from 'react';
import './EventsListItem.styles.scss';
import moment from "moment";

export const EventsListItem = ({event, handleClick}) => {
    return (
        <div onClick={() => handleClick(event.id)} className={'EventsListItem columns is-vcentered'}>
            <div className={'column is-1 has-text-centered'}>
                        <span className={'icon is-large'}>
                            <i className={'fas fa-2x fa-info-circle'}/>
                        </span>
            </div>
            <div className={'column is-8 has-text-centered'}>
                <div className={'columns is-vcentered'}>
                    <div className={'column'}>
                        {event.attributes.place}
                    </div>
                    <div className={'column'}>
                        {moment(event.attributes.starts_at).format('LLL')}
                    </div>
                </div>
            </div>
            <div className={'column has-text-centered'}>
                {event.attributes.tickets_count}
            </div>
        </div>
    );
};