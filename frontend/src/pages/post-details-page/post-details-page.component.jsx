import React from 'react';
import { useParams } from 'react-router-dom';

export const PostDetailsPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Post with id: {id} details</h1>
        </div>
    );
};