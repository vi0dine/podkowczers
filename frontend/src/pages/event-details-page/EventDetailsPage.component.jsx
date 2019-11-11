import React from 'react';
import { useParams } from 'react-router-dom';

export const EventDetailsPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Event with id: {id} details</h1>
        </div>
    );
};