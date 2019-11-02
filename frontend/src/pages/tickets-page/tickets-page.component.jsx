import React from 'react';
import {useParams} from 'react-router-dom';

export const TicketsPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Tickets for event {id}</h1>
        </div>
    );
};