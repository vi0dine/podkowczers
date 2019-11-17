import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ConcertTile } from "../../components/concert-tile/ConcertTile.component";
import './ConcertsPage.styles.scss';
import {CSSTransitionGroup} from "react-transition-group";

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

    return ready && concerts.length >= 6 && (
        <CSSTransitionGroup
            transitionName={'concerts-page'}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
        <div className='Concerts container is-fluid'>
            <div className="tile is-ancestor">
                <div className="tile is-vertical">
                    <div className="tile">
                        <div className="tile is-parent">
                            <ConcertTile id={concerts[0].id} imageUrl={concerts[0].attributes.images[0]} />
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <div className="tile is-parent">
                            <ConcertTile id={concerts[1].id} imageUrl={concerts[1].attributes.images[0]} />
                        </div>
                        <div className="tile is-parent">
                            <ConcertTile id={concerts[2].id} imageUrl={concerts[2].attributes.images[0]} />
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <ConcertTile id={concerts[3].id} imageUrl={concerts[3].attributes.images[0]} />
                </div>
                <div className="tile is-parent">
                    <div className="tile is-parent">
                        <ConcertTile id={concerts[4].id} imageUrl={concerts[4].attributes.images[0]} />
                    </div>
                    <div className="tile is-parent">
                        <ConcertTile id={concerts[5].id} imageUrl={concerts[5].attributes.images[0]} />
                    </div>
                </div>
            </div>
        </div>
        </CSSTransitionGroup>
    );
};