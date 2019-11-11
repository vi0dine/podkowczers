import React from 'react';
import {useHistory} from 'react-router-dom';
import './ConcertTile.styles.scss';

export const ConcertTile = ({id, imageUrl}) => {
    const history = useHistory();
    const styles = {
        backgroundImage: `url(${imageUrl})`
    };

    const handleClick = () => {
        history.push(`/concerts/${id}`)
    };

    return (
        <div className='tile is-child ConcertTile' onClick={() => handleClick()}>
            <div style={styles} className='ConcertTile_image' src={imageUrl} alt="concert"/>
        </div>
    );
};