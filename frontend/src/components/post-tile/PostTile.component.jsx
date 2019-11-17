import React from 'react';
import {push} from 'connected-react-router';
import './PostTile.styles.scss';
import {useDispatch} from "react-redux";

export const PostTile = ({id, title, imageUrl}) => {
    const dispatch = useDispatch();
    const styles = {
        backgroundImage: `url(${(imageUrl !== undefined ? imageUrl : 'http://via.placeholder.com/400x400')})`
    };

    const handleClick = () => {
        dispatch(push(`/blog/${id}`));
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