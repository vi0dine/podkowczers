import React from 'react';
import { useParams } from 'react-router-dom';

export const ConcertDetailsPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Concert with id: {id} details</h1>
        </div>
    );
};