import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ConcertDetailsPage.styles.scss';
import {Slideshow} from "../../components/slideshow/Slideshow.component";
import {EventsList} from "../../components/events-list/EventsList.component";

export const ConcertDetailsPage = () => {
    const { id } = useParams();

    const [ready, setReady] = useState(false);
    const [concert, setConcert] = useState(null);
    const [events, setEvents] = useState([]);

    const fetchConcert = async () => {
        let response = await axios.request({url: `/api/v1/concerts/${id}`, method: "GET"});
        setConcert(response.data.data);
        setEvents(response.data.included);
        setReady(true);
    };

    useEffect(() => {
        fetchConcert()
    }, []);

    return ready && (
        <div className={'ConcertDetails container is-fluid'}>
            <div className={'columns'}>
                <div className={'column is-5'}>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h1 className={'title'}>{concert.attributes.name}</h1>
                            <hr />
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'ConcertDetailsBody columns'}>
                            <p>{concert.attributes.description}</p>
                        </div>
                    </div>
                </div>
                <div className={'column is-7'}>
                    <div className={'ConcertDetailsSlides columns'}>
                        <div className={'column'}>
                            {/*<Slideshow images={concert.attachments} delay={6000} />*/}
                        </div>
                    </div>
                    <div className={'ConcertDetailsEvents columns'}>
                        <div className={'column'}>
                            <EventsList events={events}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};