import React from 'react';
import './ConcertTile.styles.scss';
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';

export const ConcertTile = ({id, imageUrl}) => {
    const dispatch = useDispatch();
    const styles = {
        backgroundImage: `url(${(imageUrl !== undefined ? imageUrl : 'http://via.placeholder.com/400x400')})`
    };

    const handleClick = () => {
        dispatch(push(`/concerts/${id}`));
    };

    return (
        <div className='tile is-child ConcertTile' onClick={() => handleClick()}>
            <div style={styles} className='ConcertTile_image' alt="concert"/>
        </div>
    );
};