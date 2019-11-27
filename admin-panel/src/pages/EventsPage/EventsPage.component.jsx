import React from 'react'
import { EventsTable } from "../../components/events-table/EventsTable.component";

export const EventsPage = () => {
    return (
        <div className={'EventsPage container'}>
            <div className={'columns'}>
                <div className={'column'}>
                    <h3 className={'title'}>WYDARZENIA</h3>
                    <hr />
                    <button className={'button is-primary'}>Dodaj wydarzenie</button>
                </div>
            </div>
            <div className={'columns is-centered'}>
                <div className={'column'} style={{overflowY: 'auto'}}>
                    <EventsTable/>
                </div>
            </div>
        </div>
    );
};