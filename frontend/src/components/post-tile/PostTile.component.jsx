import React from 'react';
import {useHistory} from 'react-router-dom';
import './PostTile.styles.scss';

export const PostTile = ({id, title, imageUrl}) => {
    const history = useHistory();
    const styles = {
        backgroundImage: `url(${imageUrl})`
    };

    const handleClick = () => {
        history.push(`/blog/${id}`)
    };

    return (
        <div className='tile is-child PostTile' onClick={() => handleClick()}>
            <div style={styles} className='PostTile_image' src={imageUrl} alt="post"/>
            <div className='PostTile_titleBox'>
                <p className='PostTile_title'>{title}</p>
            </div>
        </div>
    );
};