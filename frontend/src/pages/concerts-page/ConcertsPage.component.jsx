import React from 'react';
import { ConcertTile } from "../../components/concert-tile/ConcertTile.component";
import './ConcertsPage.styles.scss';

export const ConcertsPage = () => {
    return (
        <div className='Concerts container is-fluid'>
            <div className="tile is-ancestor">
                <div className="tile is-vertical">
                    <div className="tile">
                        <div className="tile is-parent">
                            <ConcertTile id={1} imageUrl='http://lorempixel.com/800/800/nightlife/1' />
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <div className="tile is-parent">
                            <ConcertTile id={2} imageUrl='http://lorempixel.com/800/800/nightlife/2' />
                        </div>
                        <div className="tile is-parent">
                            <ConcertTile id={3} imageUrl='http://lorempixel.com/800/800/nightlife/3' />
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <ConcertTile id={4} imageUrl='http://lorempixel.com/800/800/nightlife/4' />
                </div>
                <div className="tile is-parent">
                    <div className="tile is-parent">
                        <ConcertTile id={5} imageUrl='http://lorempixel.com/800/800/nightlife/5' />
                    </div>
                    <div className="tile is-parent">
                        <ConcertTile id={6} imageUrl='http://lorempixel.com/800/800/nightlife/6' />
                    </div>
                </div>
            </div>
        </div>
    );
};