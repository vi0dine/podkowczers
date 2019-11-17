import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetailsPage.styles.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import {TicketsSelector} from "../../components/tickets-selector/TicketsSelector.component";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {makeReservation} from "../../redux/user/user.actions";

export const EventDetailsPage = () => {
    const { id } = useParams();
    const user_id = useSelector(state => state.UserState.id);

    const dispatch = useDispatch();

    const [event, setEvent] = useState(null);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [ready, setReady] = useState(false);

    const fetchEvent = async () => {
        let response = await axios.request({url: `/api/v1/events/${id}`, method: "GET"});
        setEvent(response.data.data);
        setTickets(response.data.included
            .sort((a, b) => ( a.attributes.row - b.attributes.row || a.attributes.seat - b.attributes.seat)));
        setReady(true);
    };

    useEffect(() => {
        fetchEvent();
    }, []);


    const selectSeat = (ticket) => {
        setSelectedTickets([...selectedTickets, ticket]);
    };

    const deselectSeat = (ticket) => {
        setSelectedTickets(selectedTickets.filter((selected) => (selected.id !== ticket.id)));
    };

    const prepareReservation = (tickets) => {
        const tickets_ids = tickets.map((ticket) => ticket.id);
        dispatch(makeReservation(user_id, tickets_ids));
    };

    return ready && (
        <CSSTransitionGroup
            transitionName={'event-details-page'}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
        <div className={'EventDetails container is-fluid'}>
            <div className={'columns'}>
                <div className={'EventDetailsInfo column is-4'}>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h2 className={'title'}>{event.attributes.concert}</h2>
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column'}>
                            <h3 className={'subtitle'}>{event.attributes.place}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <div className={'card'}>
                                <div className={'card-header'}>
                                    <p className={'card-header-title'}>
                                        Rozpoczęcie:
                                    </p>
                                </div>
                                <div className={'card-content'}>
                                    <p>
                                        {moment(event.attributes.starts_at).format('LLL')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={'column has-text-centered'}>
                            <div className={'card'}>
                                <div className={'card-header'}>
                                    <p className={'card-header-title'}>
                                        Przewidywana długość:
                                    </p>
                                </div>
                                <div className={'card-content'}>
                                    <p>
                                        {Math.round(event.attributes.estimated_length/3600)} h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <div className={'card'}>
                                <div className={'card-header'}>
                                    <p className={'card-header-title'}>
                                        Dostępnych miejsc:
                                    </p>
                                </div>
                                <div className={'card-content'}>
                                    <p>
                                        {event.attributes.tickets_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    { selectedTickets && (
                        <div className={'columns'}>
                            <div className={'TicketsList column has-text-centered'}>
                                <CSSTransitionGroup
                                    transitionName={'ticket'}
                                    transitionEnterTimeout={300}
                                    transitionLeaveTimeout={400}
                                >
                                {selectedTickets.map((ticket) =>  (
                                        <div className={'notification'}>
                                            <div className={'columns'}>
                                                <div className={'column'}>
                                                    <h4 className={'subtitle'}>Rząd: <span className={'subtitle'}>{ticket.attributes.row}</span></h4>
                                                </div>
                                                <div className={'column'}>
                                                    <h4 className={'subtitle'}>Miejsce: <span className={'subtitle'}>{ticket.attributes.seat}</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                ))}
                                </CSSTransitionGroup>
                            </div>
                        </div>
                    ) }
                    <div className={'columns'}>
                        <div className={'column has-text-centered'}>
                            <button onClick={() => {prepareReservation(selectedTickets)}} className={'button is-large is-fullwidth is-primary'}>
                                ZAREZERWUJ
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'column'}>
                    <TicketsSelector
                        tickets={tickets}
                        handleSelect={selectSeat}
                        handleDeselect={deselectSeat}
                    />
                </div>
            </div>
        </div>
        </CSSTransitionGroup>
    );
};