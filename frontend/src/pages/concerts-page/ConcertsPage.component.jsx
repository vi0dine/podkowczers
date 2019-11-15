import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ConcertTile } from "../../components/concert-tile/ConcertTile.component";
import './ConcertsPage.styles.scss';

export const ConcertsPage = () => {
    const [concerts, setConcerts] = useState([]);
    const [ready, setReady] = useState(false);

    const fetchConcerts = async () => {
        let response = await axios.request({url: `/api/v1/concerts`, method: "GET"});
        setConcerts(response.data.data);
        setReady(true);
    };

    useEffect(() => {
        fetchConcerts()
    }, []);

    return ready && (
        <div className='Concerts container is-fluid'>
            <div className="tile is-ancestor">
                <div className="tile is-vertical">
                    <div className="tile">
                        <div className="tile is-parent">
                            <ConcertTile id={concerts[0].id} imageUrl={'http://lorempixel.com/800/800/nightlife/1'} />
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <div className="tile is-parent">
                            <ConcertTile id={concerts[1].id} imageUrl={'http://lorempixel.com/800/800/nightlife/2'} />
                        </div>
                        <div className="tile is-parent">
                            <ConcertTile id={concerts[2].id} imageUrl={'http://lorempixel.com/800/800/nightlife/3'} />
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <ConcertTile id={concerts[3].id} imageUrl={'http://lorempixel.com/800/800/nightlife/4'} />
                </div>
                <div className="tile is-parent">
                    <div className="tile is-parent">
                        <ConcertTile id={concerts[4].id} imageUrl={'http://lorempixel.com/800/800/nightlife/5'} />
                    </div>
                    <div className="tile is-parent">
                        <ConcertTile id={concerts[5].id} imageUrl={'http://lorempixel.com/800/800/nightlife/6'} />
                    </div>
                </div>
            </div>
        </div>
    );
};