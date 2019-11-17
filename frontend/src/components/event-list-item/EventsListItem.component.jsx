import React from 'react';
import './EventsListItem.styles.scss';
import moment from "moment";
import {useSelector} from "react-redux";

export const EventsListItem = ({event, handleClick}) => {
    const user = useSelector(state => state.UserState.id)

    return (
        <div onClick={() => user ? handleClick(event.id) : () => {}} className={'EventsListItem columns is-vcentered'}>
            <div className={'column is-1 has-text-centered'}>
                        <span className={'icon is-large'}>
                            <i className={'fas fa-2x fa-info-circle'}/>
                        </span>
            </div>
            <div className={'column is-8 has-text-centered'}>
                <div className={'columns is-vcentered'}>
                    <div className={'column'}>
                        <h3 className={'subtitle'}>
                            {event.attributes.place}
                        </h3>
                    </div>
                    <div className={'column'}>
                        <h3 className={'subtitle'}>
                            {moment(event.attributes.starts_at).format('LLL')}
                        </h3>
                    </div>
                </div>
            </div>
            <div className={'column has-text-centered'}>
                <h3 className={'title'}>
                    {event.attributes.tickets_count}
                </h3>
            </div>
        </div>
    );
};