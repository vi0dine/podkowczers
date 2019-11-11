import React from 'react';
import { PostTile } from "../../components/post-tile/PostTile.component";
import './BlogPage.styles.scss';

export const BlogPage = () => {
    return (
        <div className='Blog container is-fluid'>
            <div className="tile is-ancestor">
                <div className="tile is-vertical">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <PostTile id={1} title='Test tile 1' imageUrl='http://lorempixel.com/800/800/nightlife/1' />
                        </div>
                        <div className="tile is-parent">
                            <PostTile id={2} title='Test tile 2' imageUrl='http://lorempixel.com/800/800/nightlife/2' />
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <PostTile id={3} title='Test tile 3' imageUrl='http://lorempixel.com/800/800/nightlife/3' />
                    </div>
                </div>
                <div className="tile is-parent">
                    <PostTile id={4} title='Test tile 4' imageUrl='http://lorempixel.com/800/800/nightlife/4' />
                </div>
            </div>
        </div>
    );
};